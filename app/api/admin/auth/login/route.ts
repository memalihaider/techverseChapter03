import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const admin = await authenticateAdmin(email, password)

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create session token (in production, use JWT or secure session management)
    const sessionToken = Buffer.from(JSON.stringify({
      id: admin.id,
      email: admin.email,
      role: admin.role,
      timestamp: Date.now()
    })).toString('base64')

    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role,
        permissions: admin.permissions
      }
    })

    // Set cookie using NextResponse
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}
