'use client'
import { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  const targetDate = new Date('2026-01-09T00:00:00')

    const updateTimer = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, icon: '📅' },
    { label: 'Hours', value: timeLeft.hours, icon: '⏰' },
    { label: 'Minutes', value: timeLeft.minutes, icon: '⏱️' },
    { label: 'Seconds', value: timeLeft.seconds, icon: '⚡' }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-navy-300 opacity-5 rounded-full animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 opacity-5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-blue-300"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Event Countdown
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            The biggest technology event in Pakistan is approaching fast. 
            <span className="block text-blue-200 mt-2">Mark your calendars for January 9, 2026!</span>
          </p>
          
          {/* Event Date Banner */}
          <div className="inline-flex flex-col sm:flex-row items-center bg-gradient-to-r from-navy-600/50 to-blue-600/50 backdrop-blur-sm border border-blue-300/30 rounded-2xl px-6 sm:px-8 py-4 mb-12">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300 mb-2 sm:mb-0 sm:mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="text-center sm:text-left">
              <div className="text-xl sm:text-2xl font-bold text-white">January 9, 2026</div>
              <div className="text-blue-200">Techverse 2026 - Pakistan</div>
            </div>
          </div>
        </div>

        {/* Countdown Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className="group relative bg-gradient-to-br from-navy-700/80 to-blue-700/80 backdrop-blur-sm border border-blue-300/20 rounded-2xl p-4 sm:p-6 md:p-8 text-center hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon */}
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                {unit.icon}
              </div>
              
              {/* Value */}
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-1 sm:mb-2 font-mono group-hover:text-blue-200 transition-colors duration-300">
                {unit.value.toString().padStart(2, '0')}
              </div>
              
              {/* Label */}
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-200 font-semibold uppercase tracking-wider">
                {unit.label}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-2 right-2 w-4 h-4 sm:w-6 sm:h-6 border-2 border-blue-300/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 sm:w-4 sm:h-4 bg-blue-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Event Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="text-center bg-gradient-to-br from-navy-700/50 to-blue-700/50 backdrop-blur-sm border border-blue-300/20 rounded-2xl p-4 sm:p-6">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏆</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">16 Modules</h3>
            <p className="text-blue-200 text-sm sm:text-base">Competition Categories</p>
          </div>
          
          <div className="text-center bg-gradient-to-br from-blue-700/50 to-navy-700/50 backdrop-blur-sm border border-blue-300/20 rounded-2xl p-4 sm:p-6">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">👥</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">2,000+</h3>
            <p className="text-blue-200 text-sm sm:text-base">Expected Participants</p>
          </div>
          
          <div className="text-center bg-gradient-to-br from-navy-700/50 to-blue-700/50 backdrop-blur-sm border border-blue-300/20 rounded-2xl p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">�</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">FREE Workshop</h3>
            <p className="text-blue-200 text-sm sm:text-base">Hack The Box Training</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-navy-600/30 to-blue-600/30 backdrop-blur-sm border border-blue-300/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Don't Miss Out on Pakistan's Biggest Tech Event!
            </h3>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed">
              Early bird registration is now open. Secure your spot before the countdown reaches zero 
              and be part of technology history in the making.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/registration"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-navy-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-navy-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
              >
                <span>Register Now</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/modules"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-300 text-blue-100 font-bold rounded-xl hover:bg-blue-400/20 hover:border-blue-200 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                <span>Explore Modules</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}