import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  try {
    // Check admin session
    const sessionToken = request.cookies.get('admin_session')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    // Build query
    let query = supabaseAdmin
      .from('registrations')
      .select('*')
      .order('submitted_at', { ascending: false })

    // Apply status filter if provided
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    const { data: registrations, error } = await query

    if (error) {
      console.error('Error fetching registrations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch registrations' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      registrations: registrations || []
    })
  } catch (error) {
    console.error('Registrations fetch error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
