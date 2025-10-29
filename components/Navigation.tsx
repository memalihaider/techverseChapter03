'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Modules', href: '/modules' },
    { name: 'Register', href: '/registration' },
    { name: 'About', href: '/about' },
    { name: 'Rules', href: '/rules' },
    { name: 'Schedule', href: '/schedule' },
    // Team dropdown handled separately
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200' 
        : 'bg-white/90 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-navy-800 leading-tight">Techverse</span>
                  <span className="text-xs text-navy-600 font-medium leading-tight">2026</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-navy-700 px-4 py-2 text-sm font-medium transition-all duration-200 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-navy-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            {/* Team Dropdown */}
            <div className="relative group">
              <button className="relative text-gray-700 hover:text-navy-700 px-4 py-2 text-sm font-medium flex items-center group">
                Team
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-white text-navy-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <Link href="/team/2025" className="block px-4 py-2 hover:bg-blue-50">2025 Team (Legacy)</Link>
                <Link href="/team/2026" className="block px-4 py-2 hover:bg-blue-50">2026 Team (Current)</Link>
              </div>
            </div>
            <div className="ml-4 flex items-center space-x-2">
              <Link
                href="/registration"
                className="bg-navy-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Register Now
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-navy-600 focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg border-t border-gray-200 rounded-b-xl shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-navy-600 hover:bg-navy-50 block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Team Dropdown for mobile */}
              <div className="block">
                <div className="text-gray-700 px-4 py-2 text-base font-medium">Team</div>
                <Link href="/team/2025" className="block px-6 py-2 text-gray-700 hover:bg-blue-50 rounded-lg" onClick={() => setIsOpen(false)}>2025 Team (Legacy)</Link>
                <Link href="/team/2026" className="block px-6 py-2 text-gray-700 hover:bg-blue-50 rounded-lg" onClick={() => setIsOpen(false)}>2026 Team (Current)</Link>
              </div>
              <div className="pt-4 space-y-2">
                <Link
                  href="/registration"
                  className="bg-navy-600 text-white block px-4 py-3 text-base font-semibold hover:bg-navy-700 rounded-lg transition-all duration-200 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Register Now
                </Link>
                <Link
                  href="/admin/login"
                  className="border-2 border-navy-600 text-navy-600 block px-4 py-3 text-base font-medium hover:bg-navy-600 hover:text-white rounded-lg transition-all duration-200 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}