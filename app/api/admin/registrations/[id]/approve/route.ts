import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/adminAuth'
import { sendEmail, getApprovalEmailTemplate } from '@/lib/emailService'

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
    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString())

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

    // Generate certificate ID
    const certificateId = `CERT-${registration.registration_number}-${new Date().getFullYear()}`

    // Update registration
    const { error: updateError } = await supabaseAdmin
      .from('registrations')
      .update({
        status: 'approved',
        approval_date: new Date().toISOString(),
        approved_by: sessionData.id,
        certificate_id: certificateId
      })
      .eq('id', id)

    if (updateError) {
      console.error('Error updating registration:', updateError)
      return NextResponse.json(
        { error: 'Failed to approve registration' },
        { status: 500 }
      )
    }

    // Send approval email
    const emailTemplate = getApprovalEmailTemplate(
      registration.team_name,
      registration.team_leader_name,
      registration.registration_number,
      certificateId
    )

    await sendEmail(
      registration.team_leader_email,
      emailTemplate.subject,
      emailTemplate.body,
      id,
      'approval'
    )

    return NextResponse.json({
      success: true,
      message: 'Registration approved and email sent',
      certificateId
    })
  } catch (error) {
    console.error('Approve registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
