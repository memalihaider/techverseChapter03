'use client'
import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Techverse Chapter 2",
      subtitle: "Pakistan's Premier Tech Competition",
      description: "Join 2,000+ participants across 16 diverse competition modules",
      cta: "Register Now",
      background: "from-navy-900 via-navy-800 to-blue-900"
    },
    {
      title: "16 Competition Modules",
      subtitle: "AI • Gaming • Robotics • Security",
      description: "From AI Hackathons to Sumo Robot Wars - Choose your battlefield",
      cta: "View Modules",
      background: "from-navy-800 via-blue-900 to-navy-900"
    },
    {
      title: "3 Days of Innovation",
      subtitle: "March 15-17, 2026",
      description: "Experience cutting-edge technology competitions and workshops",
      cta: "Learn More",
      background: "from-blue-900 via-navy-900 to-navy-800"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-gradient-to-br ${slide.background} transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-400 opacity-10 rounded-full animate-float"></div>
        <div className="absolute top-1/2 -right-10 w-96 h-96 bg-navy-300 opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-blue-300 opacity-10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        
        {/* Tech Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 text-6xl text-white">⚡</div>
          <div className="absolute top-40 right-32 text-4xl text-white">🚀</div>
          <div className="absolute bottom-32 left-16 text-5xl text-white">💻</div>
          <div className="absolute bottom-20 right-20 text-4xl text-white">🎯</div>
          <div className="absolute top-60 left-1/2 text-3xl text-white">🔥</div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="transition-all duration-500 ease-in-out animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            {slides[currentSlide].title}
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-blue-100">
            {slides[currentSlide].subtitle}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-12 text-blue-50 max-w-3xl mx-auto leading-relaxed">
            {slides[currentSlide].description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <a
              href="/registration"
              className="group w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-navy-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-navy-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 border border-blue-400/30"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>{slides[currentSlide].cta}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a
              href="/modules"
              className="group w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 border-2 border-blue-300 text-white font-bold rounded-xl hover:bg-blue-400/20 hover:border-blue-200 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Explore Modules</span>
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-200">2K+</div>
            <div className="text-xs sm:text-sm text-blue-300">Participants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-200">16</div>
            <div className="text-xs sm:text-sm text-blue-300">Modules</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-200">3</div>
            <div className="text-xs sm:text-sm text-blue-300">Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-200">FREE</div>
            <div className="text-xs sm:text-sm text-blue-300">Workshop</div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-blue-300 scale-125' : 'bg-blue-400/50 hover:bg-blue-300/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-300 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}