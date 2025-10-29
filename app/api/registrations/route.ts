import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    
    // Extract form data
    const teamName = formData.get('teamName') as string
    const teamLeader = JSON.parse(formData.get('teamLeader') as string)
    const teamMembers = JSON.parse(formData.get('teamMembers') as string)
    const selectedModule = JSON.parse(formData.get('selectedModule') as string)
    const paymentMethod = formData.get('paymentMethod') as string
    const transactionId = formData.get('transactionId') as string
    const paymentProof = formData.get('paymentProof') as File

    // Generate unique registration ID
    const techId = `TECH${Math.floor(10000 + Math.random() * 90000)}`

    // Upload payment proof if provided
    let paymentProofPath = null
    if (paymentProof && paymentProof.size > 0) {
      const fileName = `${techId}_${Date.now()}_${paymentProof.name}`
      const { data: uploadData, error: uploadError } = await supabaseServer.storage
        .from('payment-proofs')
        .upload(fileName, paymentProof)

      if (uploadError) {
        return NextResponse.json({ error: 'Failed to upload payment proof' }, { status: 500 })
      }
      paymentProofPath = uploadData.path
    }

    // Insert registration into database
    const { data, error } = await supabaseServer
      .from('registrations')
      .insert([
        {
          tech_id: techId,
          team_name: teamName,
          leader: teamLeader,
          members: teamMembers,
          module: selectedModule.id,
          status: 'pending',
          payment_method: paymentMethod,
          transaction_id: transactionId,
          payment_proof: paymentProofPath
        }
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      registration: data,
      techId: techId,
      message: 'Registration submitted successfully!' 
    })
  } catch (err: any) {
    console.error('Registration error:', err)
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const module = searchParams.get('module')
    
    let query = supabaseServer.from('registrations').select('*')
    
    if (status) {
      query = query.eq('status', status)
    }
    
    if (module) {
      query = query.eq('module', module)
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ registrations: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch registrations' }, { status: 500 })
  }
}