import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/adminAuth'
import { sendEmail, getRejectionEmailTemplate } from '@/lib/emailService'

export async function POST(
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
    const { reason } = await request.json()

    if (!reason) {
      return NextResponse.json(
        { error: 'Rejection reason is required' },
        { status: 400 }
      )
    }

    // Get registration
    const { data: registration, error: fetchError } = await supabaseAdmin
      .from('registrations')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      )
    }

    // Update registration
    const { error: updateError } = await supabaseAdmin
      .from('registrations')
      .update({
        status: 'rejected',
        rejection_reason: reason
      })
      .eq('id', id)

    if (updateError) {
      console.error('Error updating registration:', updateError)
      return NextResponse.json(
        { error: 'Failed to reject registration' },
        { status: 500 }
      )
    }

    // Send rejection email
    const emailTemplate = getRejectionEmailTemplate(
      registration.team_name,
      registration.team_leader_name,
      registration.registration_number,
      reason
    )

    await sendEmail(
      registration.team_leader_email,
      emailTemplate.subject,
      emailTemplate.body,
      id,
      'rejection'
    )

    return NextResponse.json({
      success: true,
      message: 'Registration rejected and email sent'
    })
  } catch (error) {
    console.error('Reject registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
