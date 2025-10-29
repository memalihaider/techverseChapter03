import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, logActivity } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  try {
    // Check admin session
    const sessionToken = request.cookies.get('admin_session')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: sponsors, error } = await supabaseAdmin
      .from('sponsors')
      .select('*')
      .order('tier_order', { ascending: true })
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching sponsors:', error)
      return NextResponse.json(
        { error: 'Failed to fetch sponsors' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      sponsors: sponsors || []
    })
  } catch (error) {
    console.error('Sponsors fetch error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin session
    const sessionToken = request.cookies.get('admin_session')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString())
    const body = await request.json()

    const { name, logo_emoji, description, website, tier, is_active } = body

    if (!name || !description || !website || !tier) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Set tier order
    const tierMap: Record<string, number> = { Platinum: 1, Gold: 2, Silver: 3, Bronze: 4 }
    const tierOrder = tierMap[tier] || 3

    const { data: sponsor, error } = await supabaseAdmin
      .from('sponsors')
      .insert({
        name,
        logo_emoji: logo_emoji || '🏢',
        description,
        website,
        tier,
        tier_order: tierOrder,
        is_active: is_active !== undefined ? is_active : true,
        created_by: sessionData.id,
        social_links: {}
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating sponsor:', error)
      return NextResponse.json(
        { error: 'Failed to create sponsor' },
        { status: 500 }
      )
    }

    // Log activity
    await logActivity(sessionData.id, 'CREATE', 'sponsors', sponsor.id, null, sponsor)

    return NextResponse.json({
      success: true,
      sponsor
    })
  } catch (error) {
    console.error('Create sponsor error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
