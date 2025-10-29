'use client'
import { useState, useEffect } from 'react'

interface StatProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
  icon?: string
  duration?: number
}

const AnimatedStat = ({ value, label, suffix = '', prefix = '', icon = '', duration = 2000 }: StatProps) => {
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const updateValue = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setCurrentValue(Math.floor(easedProgress * value))

      if (now < endTime) {
        requestAnimationFrame(updateValue)
      }
    }

    updateValue()
  }, [value, duration])

  return (
    <div className="group relative p-8 bg-gradient-to-br from-navy-50 to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-navy-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-100/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Icon */}
      {icon && (
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}
      
      {/* Value */}
      <div className="relative z-10">
        <div className="text-4xl md:text-5xl font-bold text-navy-800 mb-2 font-mono">
          {prefix}{currentValue.toLocaleString()}{suffix}
        </div>
        <div className="text-lg text-navy-600 font-semibold">{label}</div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-navy-300 via-blue-300 to-navy-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse"></div>
    </div>
  )
}

export default function StatsSection() {
  const stats = [
    { value: 2000, label: 'Expected Participants', suffix: '+', icon: '👥', duration: 2500 },
    { value: 16, label: 'Competition Modules', icon: '🎯', duration: 1500 },
    { value: 3, label: 'Days of Innovation', icon: '📅', duration: 1000 },
    { value: 2500, label: 'Max Entry Fee (PKR)', icon: '�', duration: 3000 }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-white via-navy-25 to-blue-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-800 mb-6">
            Techverse Chapter 2
            <span className="block text-blue-600">By The Numbers</span>
          </h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
            Pakistan's premier technology competition featuring 16 diverse modules, 
            from AI hackathons to robotics wars, with affordable entry fees and valuable prizes.
          </p>
          
          {/* Decorative Line */}
          <div className="flex justify-center mt-8">
            <div className="w-24 h-1 bg-gradient-to-r from-navy-400 to-blue-400 rounded-full"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AnimatedStat {...stat} />
            </div>
          ))}
        </div>

        {/* Additional Info Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-navy-600 to-blue-600 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="text-3xl mr-3">⚡</span>
              Diverse Competition Portfolio
            </h3>
            <p className="text-navy-100 text-lg leading-relaxed">
              Techverse Chapter 2 features 16 unique modules spanning AI, cybersecurity, gaming, 
              robotics, and more - something for every tech enthusiast.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-navy-600 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="text-3xl mr-3">🎓</span>
              Learn & Compete
            </h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              From competitive tournaments to free workshops like Hack The Box training, 
              gain hands-on experience with cutting-edge technologies.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-navy-50 to-blue-50 p-8 rounded-2xl border border-navy-200">
            <h3 className="text-2xl font-bold text-navy-800 mb-4">
              Ready to be part of Techverse Chapter 2?
            </h3>
            <p className="text-navy-600 mb-6">
              Registration is now open for all 16 modules. Entry fees range from PKR 1,000 to 2,500, 
              with a FREE cybersecurity workshop included!
            </p>
            <a
              href="/registration"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-navy-600 to-blue-600 text-white font-bold rounded-xl hover:from-navy-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Start Registration</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}