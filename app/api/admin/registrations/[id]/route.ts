import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/adminAuth'

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

    const { id } = params

    // Delete registration
    const { error } = await supabaseAdmin
      .from('registrations')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting registration:', error)
      return NextResponse.json(
        { error: 'Failed to delete registration' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Registration deleted successfully'
    })
  } catch (error) {
    console.error('Delete registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin session
    const sessionToken = request.cookies.get('admin_session')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    const { data: registration, error } = await supabaseAdmin
      .from('registrations')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      registration
    })
  } catch (error) {
    console.error('Get registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
