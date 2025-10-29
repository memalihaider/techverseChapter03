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

    const { title, description, media_type, media_url, thumbnail_url, event_year, category, is_active, is_featured } = body

    const { data: oldData } = await supabaseAdmin
      .from('event_highlights')
      .select('*')
      .eq('id', id)
      .single()

    const { data: highlight, error } = await supabaseAdmin
      .from('event_highlights')
      .update({
        title,
        description,
        media_type,
        media_url,
        thumbnail_url,
        event_year,
        category,
        is_active,
        is_featured
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating highlight:', error)
      return NextResponse.json({ error: 'Failed to update highlight' }, { status: 500 })
    }

    await logActivity(sessionData.id, 'UPDATE', 'event_highlights', id, oldData, highlight)

    return NextResponse.json({ success: true, highlight })
  } catch (error) {
    console.error('Update highlight error:', error)
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
      .from('event_highlights')
      .select('*')
      .eq('id', id)
      .single()

    const { error } = await supabaseAdmin
      .from('event_highlights')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting highlight:', error)
      return NextResponse.json({ error: 'Failed to delete highlight' }, { status: 500 })
    }

    await logActivity(sessionData.id, 'DELETE', 'event_highlights', id, oldData, null)

    return NextResponse.json({ success: true, message: 'Highlight deleted successfully' })
  } catch (error) {
    console.error('Delete highlight error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
