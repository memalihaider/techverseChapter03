import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const year = searchParams.get('year')
    const category = searchParams.get('category')

    let query = supabase
      .from('event_highlights')
      .select('*')
      .eq('is_active', true)

    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    if (year) {
      query = query.eq('event_year', parseInt(year))
    }

    if (category) {
      query = query.eq('category', category)
    }

    const { data: highlights, error } = await query
      .order('is_featured', { ascending: false })
      .order('event_year', { ascending: false })
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching highlights:', error)
      return NextResponse.json({ error: 'Failed to fetch highlights' }, { status: 500 })
    }

    return NextResponse.json({ highlights })
  } catch (error) {
    console.error('Highlights API error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
