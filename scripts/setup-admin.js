const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function deploySchema() {
  console.log('📦 Deploying database schema...\n')

  try {
    // Read enhanced schema
    const schemaPath = path.join(__dirname, 'enhanced-schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')

    console.log('✓ Schema file loaded')
    console.log('⚠️  Note: Please run the SQL file directly in Supabase SQL Editor')
    console.log('   The file is located at: scripts/enhanced-schema.sql\n')

    return true
  } catch (error) {
    console.error('❌ Error loading schema:', error)
    return false
  }
}

async function createDefaultAdmin() {
  console.log('👤 Creating default admin user...\n')

  const adminEmail = 'admin@techverse2026.com'
  const adminPassword = 'Techverse2026@Admin!' // Change this immediately after first login
  const adminName = 'System Administrator'

  try {
    // Hash password
    const passwordHash = await bcrypt.hash(adminPassword, 10)

    // Check if admin already exists
    const { data: existing } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', adminEmail)
      .single()

    if (existing) {
      console.log('⚠️  Admin user already exists')
      
      // Update password
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({
          password_hash: passwordHash,
          full_name: adminName,
          role: 'super_admin',
          permissions: {
            manage_users: true,
            manage_sponsors: true,
            manage_team: true,
            manage_content: true,
            manage_registrations: true,
            manage_highlights: true
          },
          is_active: true
        })
        .eq('email', adminEmail)

      if (updateError) {
        console.error('❌ Error updating admin:', updateError)
        return false
      }

      console.log('✓ Admin user updated successfully')
    } else {
      // Create new admin
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({
          email: adminEmail,
          password_hash: passwordHash,
          full_name: adminName,
          role: 'super_admin',
          permissions: {
            manage_users: true,
            manage_sponsors: true,
            manage_team: true,
            manage_content: true,
            manage_registrations: true,
            manage_highlights: true
          },
          is_active: true
        })

      if (insertError) {
        console.error('❌ Error creating admin:', insertError)
        return false
      }

      console.log('✓ Admin user created successfully')
    }

    console.log('\n' + '='.repeat(60))
    console.log('🎉 ADMIN CREDENTIALS')
    console.log('='.repeat(60))
    console.log(`Email:    ${adminEmail}`)
    console.log(`Password: ${adminPassword}`)
    console.log('='.repeat(60))
    console.log('⚠️  IMPORTANT: Change this password immediately after first login!')
    console.log('='.repeat(60) + '\n')

    return true
  } catch (error) {
    console.error('❌ Error creating admin:', error)
    return false
  }
}

async function insertSampleModules() {
  console.log('🎯 Inserting competition modules...\n')

  const modules = [
    { module_name: 'Web Development', module_code: 'WEB-DEV', icon_emoji: '🌐', description: 'Build modern, responsive web applications', skills_required: ['HTML5/CSS3', 'JavaScript/TypeScript', 'React/Next.js', 'Tailwind CSS'], difficulty_level: 'Intermediate', max_teams: 50 },
    { module_name: 'Mobile App Development', module_code: 'MOBILE-DEV', icon_emoji: '📱', description: 'Create cross-platform mobile applications', skills_required: ['React Native', 'Flutter', 'iOS/Android', 'Mobile UI/UX'], difficulty_level: 'Intermediate', max_teams: 40 },
    { module_name: 'AI & Machine Learning', module_code: 'AI-ML', icon_emoji: '🤖', description: 'Develop intelligent systems and models', skills_required: ['Python', 'TensorFlow', 'Neural Networks', 'Data Processing'], difficulty_level: 'Advanced', max_teams: 30 },
    { module_name: 'Cloud Computing', module_code: 'CLOUD', icon_emoji: '☁️', description: 'Deploy and manage scalable cloud solutions', skills_required: ['AWS/Azure', 'Docker', 'Kubernetes', 'DevOps'], difficulty_level: 'Advanced', max_teams: 30 },
    { module_name: 'Cybersecurity', module_code: 'SECURITY', icon_emoji: '🔒', description: 'Secure systems and protect data', skills_required: ['Network Security', 'Encryption', 'Penetration Testing', 'Security Audits'], difficulty_level: 'Advanced', max_teams: 25 },
    { module_name: 'Blockchain', module_code: 'BLOCKCHAIN', icon_emoji: '⛓️', description: 'Build decentralized applications', skills_required: ['Solidity', 'Smart Contracts', 'Web3.js', 'DApp Development'], difficulty_level: 'Advanced', max_teams: 20 },
    { module_name: 'IoT Development', module_code: 'IOT', icon_emoji: '🔌', description: 'Connect and control smart devices', skills_required: ['Arduino', 'Raspberry Pi', 'Sensors', 'Embedded Systems'], difficulty_level: 'Intermediate', max_teams: 30 },
    { module_name: 'Game Development', module_code: 'GAME-DEV', icon_emoji: '🎮', description: 'Design and build interactive games', skills_required: ['Unity', 'Unreal Engine', 'C#', 'Game Design'], difficulty_level: 'Intermediate', max_teams: 35 },
    { module_name: 'Data Science', module_code: 'DATA-SCI', icon_emoji: '📊', description: 'Analyze and visualize complex data', skills_required: ['Python', 'Pandas', 'Visualization', 'Statistical Analysis'], difficulty_level: 'Intermediate', max_teams: 40 },
    { module_name: 'UI/UX Design', module_code: 'UIUX', icon_emoji: '🎨', description: 'Create beautiful user experiences', skills_required: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'], difficulty_level: 'Beginner', max_teams: 50 },
    { module_name: 'Database Management', module_code: 'DATABASE', icon_emoji: '💾', description: 'Design and optimize data storage', skills_required: ['SQL', 'NoSQL', 'Database Design', 'Query Optimization'], difficulty_level: 'Intermediate', max_teams: 35 },
    { module_name: 'API Development', module_code: 'API-DEV', icon_emoji: '🔗', description: 'Build robust backend services', skills_required: ['REST API', 'GraphQL', 'Node.js', 'API Security'], difficulty_level: 'Intermediate', max_teams: 40 }
  ]

  try {
    for (const module of modules) {
      const { error } = await supabase
        .from('competition_modules')
        .upsert(module, { onConflict: 'module_name' })

      if (error) {
        console.log(`⚠️  Module "${module.module_name}" may already exist`)
      } else {
        console.log(`✓ Inserted module: ${module.module_name}`)
      }
    }

    console.log('\n✓ All modules processed successfully\n')
    return true
  } catch (error) {
    console.error('❌ Error inserting modules:', error)
    return false
  }
}

async function main() {
  console.log('\n' + '='.repeat(60))
  console.log('🚀 TECHVERSE 2026 - ADMIN PORTAL SETUP')
  console.log('='.repeat(60) + '\n')

  // Step 1: Deploy schema
  await deploySchema()

  // Step 2: Create admin user
  const adminCreated = await createDefaultAdmin()

  // Step 3: Insert sample modules
  if (adminCreated) {
    await insertSampleModules()
  }

  console.log('='.repeat(60))
  console.log('✅ SETUP COMPLETE')
  console.log('='.repeat(60))
  console.log('\nNext Steps:')
  console.log('1. Run the enhanced-schema.sql file in Supabase SQL Editor')
  console.log('2. Login to admin portal at: http://localhost:3002/admin/login')
  console.log('3. Use the credentials shown above')
  console.log('4. Change your password immediately after first login\n')
}

main().catch(console.error)
