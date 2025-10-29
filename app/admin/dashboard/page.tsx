'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  registrations: {
    total: number
    pending: number
    approved: number
    rejected: number
  }
  sponsors: {
    total: number
    platinum: number
    gold: number
    silver: number
  }
  team: {
    total: number
    featured: number
  }
  highlights: {
    total: number
    images: number
    videos: number
  }
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to Techverse 2026 Admin Portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Registrations Card */}
        <Link href="/admin/registrations" className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <div className="text-4xl mb-3">📝</div>
          <div className="text-3xl font-bold mb-2">{stats?.registrations.total || 0}</div>
          <div className="text-blue-100 font-medium mb-3">Total Registrations</div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="font-bold">{stats?.registrations.pending || 0}</div>
              <div className="text-blue-200">Pending</div>
            </div>
            <div>
              <div className="font-bold">{stats?.registrations.approved || 0}</div>
              <div className="text-blue-200">Approved</div>
            </div>
            <div>
              <div className="font-bold">{stats?.registrations.rejected || 0}</div>
              <div className="text-blue-200">Rejected</div>
            </div>
          </div>
        </Link>

        {/* Sponsors Card */}
        <Link href="/admin/sponsors" className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <div className="text-4xl mb-3">🤝</div>
          <div className="text-3xl font-bold mb-2">{stats?.sponsors.total || 0}</div>
          <div className="text-green-100 font-medium mb-3">Active Sponsors</div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="font-bold">{stats?.sponsors.platinum || 0}</div>
              <div className="text-green-200">Platinum</div>
            </div>
            <div>
              <div className="font-bold">{stats?.sponsors.gold || 0}</div>
              <div className="text-green-200">Gold</div>
            </div>
            <div>
              <div className="font-bold">{stats?.sponsors.silver || 0}</div>
              <div className="text-green-200">Silver</div>
            </div>
          </div>
        </Link>

        {/* Team Card */}
        <Link href="/admin/team" className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <div className="text-4xl mb-3">👥</div>
          <div className="text-3xl font-bold mb-2">{stats?.team.total || 0}</div>
          <div className="text-purple-100 font-medium mb-3">Team Members</div>
          <div className="text-sm">
            <div className="font-bold">{stats?.team.featured || 0}</div>
            <div className="text-purple-200">Featured Members</div>
          </div>
        </Link>

        {/* Highlights Card */}
        <Link href="/admin/highlights" className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <div className="text-4xl mb-3">📸</div>
          <div className="text-3xl font-bold mb-2">{stats?.highlights.total || 0}</div>
          <div className="text-orange-100 font-medium mb-3">Event Highlights</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="font-bold">{stats?.highlights.images || 0}</div>
              <div className="text-orange-200">Images</div>
            </div>
            <div>
              <div className="font-bold">{stats?.highlights.videos || 0}</div>
              <div className="text-orange-200">Videos</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-navy-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/registrations?status=pending"
            className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
          >
            <div className="text-2xl mb-2">⏳</div>
            <div className="font-semibold text-sm">Review Pending</div>
          </Link>
          <Link
            href="/admin/sponsors/new"
            className="p-4 border-2 border-green-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center"
          >
            <div className="text-2xl mb-2">➕</div>
            <div className="font-semibold text-sm">Add Sponsor</div>
          </Link>
          <Link
            href="/admin/team/new"
            className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-center"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="font-semibold text-sm">Add Team Member</div>
          </Link>
          <Link
            href="/admin/highlights/new"
            className="p-4 border-2 border-orange-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-center"
          >
            <div className="text-2xl mb-2">🖼️</div>
            <div className="font-semibold text-sm">Add Highlight</div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-navy-800 mb-4">Recent Activity</h2>
        <div className="text-gray-500 text-center py-8">
          No recent activity
        </div>
      </div>
    </div>
  )
}
