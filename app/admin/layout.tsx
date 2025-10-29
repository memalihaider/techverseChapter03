'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface SponsorNav {
  id: string
  name: string
  logo_url?: string
}

interface TeamMemberNav {
  id: string
  name: string
  avatar_url?: string
}
interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [admin, setAdmin] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sponsorNav, setSponsorNav] = useState<SponsorNav | null>(null)
  const [teamNav, setTeamNav] = useState<TeamMemberNav | null>(null)

  useEffect(() => {
    checkSession()
    fetchSponsorNav()
    fetchTeamNav()
    // eslint-disable-next-line
  }, [])

  const fetchSponsorNav = async () => {
    try {
      const response = await fetch('/api/admin/sponsors')
      const data = await response.json()
      if (data.sponsors && data.sponsors.length > 0) {
        setSponsorNav({
          id: data.sponsors[0].id,
          name: data.sponsors[0].name,
          logo_url: data.sponsors[0].logo_url || undefined
        })
      }
    } catch (e) {}
  }

  const fetchTeamNav = async () => {
    try {
      const response = await fetch('/api/admin/team')
      const data = await response.json()
      if (data.members && data.members.length > 0) {
        setTeamNav({
          id: data.members[0].id,
          name: data.members[0].name,
          avatar_url: data.members[0].avatar_url || undefined
        })
      }
    } catch (e) {}
  }

  const checkSession = async () => {
    try {
      const response = await fetch('/api/admin/auth/session')
      const data = await response.json()

      if (data.authenticated) {
        setAdmin(data.admin)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: null },
    { name: 'Registrations', href: '/admin/registrations', icon: null },
    { name: 'Sponsors', href: '/admin/sponsors', icon: sponsorNav && sponsorNav.logo_url ? (
      <img src={sponsorNav.logo_url} alt={sponsorNav.name} className="w-7 h-7 rounded-full object-contain bg-white border border-gray-200" />
    ) : null },
    { name: 'Team Members', href: '/admin/team', icon: teamNav && teamNav.avatar_url ? (
      <img src={teamNav.avatar_url} alt={teamNav.name} className="w-7 h-7 rounded-full object-cover bg-white border border-gray-200" />
    ) : null },
    { name: 'Event Highlights', href: '/admin/highlights', icon: null },
    { name: 'Modules', href: '/admin/modules', icon: null },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Top Navbar */}
      <nav className="bg-gradient-to-r from-navy-900 to-navy-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-full mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Techverse 2026
                </span> Admin
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <div className="font-semibold">{admin?.email}</div>
                <div className="text-xs text-gray-400">{admin?.role}</div>
              </div>
              <Link
                href="/"
                target="_blank"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen sticky top-16">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon && (
                    <span>{item.icon}</span>
                  )}
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
