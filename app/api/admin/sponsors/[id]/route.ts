import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, logActivity } from '@/lib/adminAuth'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin session
    const sessionToken = request.cookies.get('admin_session')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString())
    const { id } = params
    const body = await request.json()

    const { name, logo_emoji, description, website, tier, is_active } = body

    // Get old data for logging
    const { data: oldData } = await supabaseAdmin
      .from('sponsors')
      .select('*')
      .eq('id', id)
      .single()

    // Set tier order
    const tierMap: Record<string, number> = { Platinum: 1, Gold: 2, Silver: 3, Bronze: 4 }
    const tierOrder = tierMap[tier] || 3

    const { data: sponsor, error } = await supabaseAdmin
      .from('sponsors')
      .update({
        name,
        logo_emoji,
        description,
        website,
        tier,
        tier_order: tierOrder,
        is_active
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating sponsor:', error)
      return NextResponse.json(
        { error: 'Failed to update sponsor' },
        { status: 500 }
      )
    }

    // Log activity
    await logActivity(sessionData.id, 'UPDATE', 'sponsors', id, oldData, sponsor)

    return NextResponse.json({
      success: true,
      sponsor
    })
  } catch (error) {
    console.error('Update sponsor error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin session
    const sessionToken = request.cookies.get('admin_session')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString())
    const { id } = params

    // Get old data for logging
    const { data: oldData } = await supabaseAdmin
      .from('sponsors')
      .select('*')
      .eq('id', id)
      .single()

    const { error } = await supabaseAdmin
      .from('sponsors')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting sponsor:', error)
      return NextResponse.json(
        { error: 'Failed to delete sponsor' },
        { status: 500 }
      )
    }

    // Log activity
    await logActivity(sessionData.id, 'DELETE', 'sponsors', id, oldData, null)

    return NextResponse.json({
      success: true,
      message: 'Sponsor deleted successfully'
    })
  } catch (error) {
    console.error('Delete sponsor error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
