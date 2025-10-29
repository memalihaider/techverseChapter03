import { NextResponse } from 'next/server'
import { supabaseClient } from '../../../lib/supabase'

export async function GET() {
  try {
    // Fetch active sponsors from public view
    const { data: sponsors, error } = await supabaseClient
      .from('public_sponsors')
      .select('*')
      .order('tier_order', { ascending: true })
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch sponsors' }, { status: 500 })
    }

    return NextResponse.json({ 
      sponsors: sponsors || [],
      count: sponsors?.length || 0 
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}