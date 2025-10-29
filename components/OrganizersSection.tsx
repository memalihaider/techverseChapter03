'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface TeamMember {
  id: string
  name: string
  position: string
  department: string
  hierarchy: string
  avatar_url?: string
  avatar_emoji?: string
  bio: string
  social_links: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

export default function OrganizersSection() {
  const [organizers, setOrganizers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOrganizers()
  }, [])

  const fetchOrganizers = async () => {
    try {
      const response = await fetch('/api/team/featured')
      if (!response.ok) {
        throw new Error('Failed to fetch organizers')
      }
      const data = await response.json()
      setOrganizers(data.teamMembers || [])
    } catch (err) {
      console.error('Error fetching organizers:', err)
      setError('Failed to load organizers')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="relative py-16 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 mb-6">
              <span className="text-blue-300 text-sm font-medium">Loading Team...</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 animate-pulse">
                <div className="h-16 bg-white/20 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-3 bg-white/20 rounded mb-3"></div>
                <div className="h-3 bg-white/20 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative py-16 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-400 text-lg">⚠️ {error}</div>
          <button 
            onClick={fetchOrganizers}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-16 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 mb-6">
            <span className="text-blue-300 text-sm font-medium">Leadership Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet the <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Organizers</span>
          </h2>
          <p className="text-lg text-gray-300">The visionaries behind Techverse 2026</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {organizers.map((organizer, index) => (
            <div 
              key={organizer.id || index} 
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              {/* Department Tag */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {organizer.department}
              </div>
              
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  {organizer.avatar_url ? (
                    <img
                      src={organizer.avatar_url}
                      alt={organizer.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-blue-200 bg-white"
                    />
                  ) : (
                    <span className="text-6xl">{organizer.avatar_emoji || '👤'}</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{organizer.name}</h3>
                <p className="text-blue-300 font-semibold mb-3">{organizer.position}</p>
                <p className="text-gray-300 text-sm">{organizer.bio}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-6">Want to meet the complete team?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/team"
              className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-semibold hover:from-blue-400 hover:to-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <span className="relative z-10">View Full Team</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <a
              href="mailto:contact@techverse2026.com"
              className="group relative px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl text-white font-semibold hover:from-green-400 hover:to-teal-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}