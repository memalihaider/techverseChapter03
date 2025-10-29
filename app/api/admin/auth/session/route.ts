import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value

    if (!sessionToken) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    // Decode session token
    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString())

    // Check if session is expired (7 days)
    const sessionAge = Date.now() - sessionData.timestamp
    const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

    if (sessionAge > maxAge) {
      return NextResponse.json(
        { authenticated: false, error: 'Session expired' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: sessionData.id,
        email: sessionData.email,
        role: sessionData.role
      }
    })
  } catch (error) {
    console.error('Session verification error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    )
  }
}
