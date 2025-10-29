import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  try {
    // Check admin session
    const sessionToken = request.cookies.get('admin_session')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch registration stats
    const { data: registrations } = await supabaseAdmin
      .from('registrations')
      .select('status')

    const regStats = {
      total: registrations?.length || 0,
      pending: registrations?.filter(r => r.status === 'pending').length || 0,
      approved: registrations?.filter(r => r.status === 'approved').length || 0,
      rejected: registrations?.filter(r => r.status === 'rejected').length || 0
    }

    // Fetch sponsor stats
    const { data: sponsors } = await supabaseAdmin
      .from('sponsors')
      .select('tier, is_active')
      .eq('is_active', true)

    const sponsorStats = {
      total: sponsors?.length || 0,
      platinum: sponsors?.filter(s => s.tier === 'Platinum').length || 0,
      gold: sponsors?.filter(s => s.tier === 'Gold').length || 0,
      silver: sponsors?.filter(s => s.tier === 'Silver').length || 0
    }

    // Fetch team stats
    const { data: team } = await supabaseAdmin
      .from('team_members')
      .select('is_featured, is_active')
      .eq('is_active', true)

    const teamStats = {
      total: team?.length || 0,
      featured: team?.filter(t => t.is_featured).length || 0
    }

    // Fetch highlights stats
    const { data: highlights } = await supabaseAdmin
      .from('event_highlights')
      .select('media_type, is_active')
      .eq('is_active', true)

    const highlightStats = {
      total: highlights?.length || 0,
      images: highlights?.filter(h => h.media_type === 'image').length || 0,
      videos: highlights?.filter(h => h.media_type === 'video' || h.media_type === 'youtube').length || 0
    }

    return NextResponse.json({
      success: true,
      stats: {
        registrations: regStats,
        sponsors: sponsorStats,
        team: teamStats,
        highlights: highlightStats
      }
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
