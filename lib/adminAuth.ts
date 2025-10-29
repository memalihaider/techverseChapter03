import { createClient } from '@supabase/supabase-js'
import * as bcrypt from 'bcryptjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export interface AdminUser {
  id: string
  email: string
  full_name: string
  role: 'super_admin' | 'admin' | 'moderator'
  permissions: Record<string, boolean>
  is_active: boolean
  last_login: string | null
  created_at: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function authenticateAdmin(email: string, password: string): Promise<AdminUser | null> {
  try {
    // Get admin user
    const { data: admin, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single()

    if (error || !admin) {
      return null
    }

    // Verify password
    const isValid = await verifyPassword(password, admin.password_hash)
    if (!isValid) {
      return null
    }

    // Update last login
    await supabaseAdmin
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id)

    // Return admin without password hash
    const { password_hash, ...adminData } = admin
    return adminData as AdminUser
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

export async function createAdminUser(
  email: string,
  password: string,
  full_name: string,
  role: 'super_admin' | 'admin' | 'moderator' = 'admin',
  permissions: Record<string, boolean> = {}
): Promise<AdminUser | null> {
  try {
    const password_hash = await hashPassword(password)

    const { data: admin, error } = await supabaseAdmin
      .from('admin_users')
      .insert({
        email,
        password_hash,
        full_name,
        role,
        permissions,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      console.error('Create admin error:', error)
      return null
    }

    const { password_hash: _, ...adminData } = admin
    return adminData as AdminUser
  } catch (error) {
    console.error('Create admin error:', error)
    return null
  }
}

export async function logActivity(
  adminId: string,
  action: string,
  tableName: string,
  recordId: string | null = null,
  oldValues: any = null,
  newValues: any = null
): Promise<void> {
  try {
    await supabaseAdmin
      .from('activity_logs')
      .insert({
        admin_id: adminId,
        action,
        table_name: tableName,
        record_id: recordId,
        old_values: oldValues,
        new_values: newValues
      })
  } catch (error) {
    console.error('Activity log error:', error)
  }
}
