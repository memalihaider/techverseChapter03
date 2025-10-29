import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, logActivity } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: highlights, error } = await supabaseAdmin
      .from('event_highlights')
      .select('*')
      .order('is_featured', { ascending: false })
      .order('event_year', { ascending: false })
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching highlights:', error)
      return NextResponse.json({ error: 'Failed to fetch highlights' }, { status: 500 })
    }

    return NextResponse.json({ success: true, highlights: highlights || [] })
  } catch (error) {
    console.error('Highlights fetch error:', error)
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

    const { title, description, media_type, media_url, thumbnail_url, event_year, category, is_active, is_featured } = body

    if (!title || !media_type || !media_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data: highlight, error } = await supabaseAdmin
      .from('event_highlights')
      .insert({
        title,
        description: description || null,
        media_type,
        media_url,
        thumbnail_url: thumbnail_url || null,
        event_year: event_year || null,
        category: category || null,
        is_active: is_active !== undefined ? is_active : true,
        is_featured: is_featured || false,
        uploaded_by: sessionData.id
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating highlight:', error)
      return NextResponse.json({ error: 'Failed to create highlight' }, { status: 500 })
    }

    await logActivity(sessionData.id, 'CREATE', 'event_highlights', highlight.id, null, highlight)

    return NextResponse.json({ success: true, highlight })
  } catch (error) {
    console.error('Create highlight error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
