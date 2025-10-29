import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, logActivity } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: members, error } = await supabaseAdmin
      .from('team_members')
      .select('*')
      .order('hierarchy_order', { ascending: true })
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching team members:', error)
      return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 })
    }

    return NextResponse.json({ success: true, members: members || [] })
  } catch (error) {
    console.error('Team members fetch error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString())
    const body = await request.json()

    const { name, position, department, hierarchy, avatar_emoji, bio, is_active, is_featured } = body

    if (!name || !position || !department || !hierarchy || !bio) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

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
      .insert({
        name,
        position,
        department,
        hierarchy,
        hierarchy_order: hierarchyOrder[hierarchy] || 6,
        avatar_emoji: avatar_emoji || '👤',
        bio,
        is_active: is_active !== undefined ? is_active : true,
        is_featured: is_featured || false,
        created_by: sessionData.id,
        social_links: {}
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating team member:', error)
      return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 })
    }

    await logActivity(sessionData.id, 'CREATE', 'team_members', member.id, null, member)

    return NextResponse.json({ success: true, member })
  } catch (error) {
    console.error('Create team member error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
