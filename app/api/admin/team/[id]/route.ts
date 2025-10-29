import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, logActivity } from '@/lib/adminAuth'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString())
    const { id } = params
    const body = await request.json()

    const { name, position, department, hierarchy, avatar_emoji, bio, is_active, is_featured } = body

    const { data: oldData } = await supabaseAdmin
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single()

    const hierarchyOrder: Record<string, number> = {
      'Organizers': 1,
      'Directors': 2,
      'Co-Directors': 3,
      'Supervisors': 4,
      'Leads': 5,
      'Team Members': 6,
      'Volunteers': 7
    }

    const { data: member, error } = await supabaseAdmin
      .from('team_members')
      .update({
        name,
        position,
        department,
        hierarchy,
        hierarchy_order: hierarchyOrder[hierarchy] || 6,
        avatar_emoji,
        bio,
        is_active,
        is_featured
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating team member:', error)
      return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
    }

    await logActivity(sessionData.id, 'UPDATE', 'team_members', id, oldData, member)

    return NextResponse.json({ success: true, member })
  } catch (error) {
    console.error('Update team member error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString())
    const { id } = params

    const { data: oldData } = await supabaseAdmin
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single()

    const { error } = await supabaseAdmin
      .from('team_members')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting team member:', error)
      return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 })
    }

    await logActivity(sessionData.id, 'DELETE', 'team_members', id, oldData, null)

    return NextResponse.json({ success: true, message: 'Team member deleted successfully' })
  } catch (error) {
    console.error('Delete team member error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
