import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../../lib/supabase'
import { generateCertificatePdf } from '../../../../lib/pdfGenerator'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { techId, participantName } = body

    if (!techId || !participantName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify registration exists and is approved
    const { data: registration, error: regError } = await supabaseServer
      .from('registrations')
      .select('*')
      .eq('tech_id', techId)
      .eq('status', 'approved')
      .single()

    if (regError || !registration) {
      return NextResponse.json({ error: 'Registration not found or not approved' }, { status: 404 })
    }

    // Check if certificate already exists
    const { data: existingCert, error: certError } = await supabaseServer
      .from('certificates')
      .select('*')
      .eq('registration_id', registration.id)
      .eq('participant_name', participantName)
      .single()

    if (existingCert) {
      return NextResponse.json({ 
        success: true, 
        certificate: existingCert,
        message: 'Certificate already exists' 
      })
    }

    // Generate verification code
    const verificationCode = `CERT${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`

    // Generate certificate PDF
    const pdfBlob = generateCertificatePdf({
      name: participantName,
      event: registration.module,
      date: new Date().toLocaleDateString(),
      verificationCode: verificationCode
    })

    // Upload PDF to storage
    const fileName = `${verificationCode}.pdf`
    const { data: uploadData, error: uploadError } = await supabaseServer.storage
      .from('certificates')
      .upload(fileName, pdfBlob)

    if (uploadError) {
      return NextResponse.json({ error: 'Failed to upload certificate' }, { status: 500 })
    }

    // Save certificate record
    const { data: certificate, error: insertError } = await supabaseServer
      .from('certificates')
      .insert([
        {
          registration_id: registration.id,
          participant_name: participantName,
          verification_code: verificationCode,
          pdf_path: uploadData.path
        }
      ])
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      certificate: certificate,
      downloadUrl: `/api/certificates/download?code=${verificationCode}`
    })
  } catch (err: any) {
    console.error('Certificate generation error:', err)
    return NextResponse.json({ error: err.message || 'Certificate generation failed' }, { status: 500 })
  }
}