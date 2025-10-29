import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    // Get featured team members from the featured_team_members view
    const { data: teamMembers, error } = await supabase
      .from('featured_team_members')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching featured team members:', error)
      return NextResponse.json(
        { error: 'Failed to fetch featured team members' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      teamMembers: teamMembers || []
    })

  } catch (error) {
    console.error('Error in featured team API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}