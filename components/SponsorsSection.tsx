'use client'

import { useState, useEffect } from 'react'

interface Sponsor {
  id: string
  name: string
  logo_url?: string
  logo_emoji?: string
  description: string
  website: string
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Bronze'
  social_links: {
    linkedin?: string
    twitter?: string
    website?: string
  }
}

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSponsors()
  }, [])

  const fetchSponsors = async () => {
    try {
      const response = await fetch('/api/sponsors')
      if (!response.ok) {
        throw new Error('Failed to fetch sponsors')
      }
      const data = await response.json()
      setSponsors(data.sponsors || [])
    } catch (err) {
      console.error('Error fetching sponsors:', err)
      setError('Failed to load sponsors')
    } finally {
      setLoading(false)
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'from-gray-300 to-white'
      case 'Gold':
        return 'from-yellow-400 to-yellow-200'
      case 'Silver':
        return 'from-gray-400 to-gray-200'
      case 'Bronze':
        return 'from-orange-400 to-orange-200'
      default:
        return 'from-blue-400 to-blue-200'
    }
  }

  if (loading) {
    return (
      <section className="relative py-16 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 mb-6">
              <span className="text-blue-300 text-sm font-medium">Loading Sponsors...</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 animate-pulse">
                  <div className="h-16 bg-white/20 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-white/20 rounded mb-2"></div>
                  <div className="h-3 bg-white/20 rounded mb-3"></div>
                  <div className="h-3 bg-white/20 rounded w-3/4 mx-auto"></div>
                </div>
              ))}
            </div>
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
            onClick={fetchSponsors}
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
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 mb-6">
            <span className="text-blue-300 text-sm font-medium">Powered by Industry Leaders</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Sponsors</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Partnering with innovative companies to shape the future of technology
          </p>
        </div>

        {/* Compact Sponsors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sponsors.map((sponsor, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              {/* Tier Tag */}
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold bg-gradient-to-r ${getTierColor(sponsor.tier)} text-gray-900`}>
                {sponsor.tier}
              </div>
              
              <div className="relative z-10 text-center">
                <div className="mb-4 flex justify-center">
                  {sponsor.logo_url ? (
                    <img
                      src={sponsor.logo_url}
                      alt={sponsor.name}
                      className="w-16 h-16 rounded-full object-contain border-2 border-blue-200 bg-white"
                    />
                  ) : (
                    <span className="text-4xl">{sponsor.logo_emoji || '🏢'}</span>
                  )}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{sponsor.name}</h4>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{sponsor.description}</p>
                <div className="text-xs text-blue-300 font-mono opacity-70">{sponsor.website}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col items-center">
            <p className="text-gray-300 mb-4">Interested in becoming a sponsor?</p>
            <button className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-semibold hover:from-blue-400 hover:to-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              <span className="relative z-10">Partner With Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}