'use client'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Techverse 2026</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pakistan's Premier Technology Competition Platform
            </p>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-navy-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Techverse 2026 aims to create a platform where tech enthusiasts, developers, and innovators 
                can showcase their skills, compete in exciting challenges, and connect with like-minded individuals. 
                We believe in fostering innovation and providing opportunities for talented individuals to shine.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-navy-800 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become the leading technology event platform in Pakistan, inspiring the next generation 
                of tech leaders and creating a vibrant ecosystem where innovation thrives. We envision a future 
                where every talented individual has the opportunity to demonstrate their potential.
              </p>
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-gradient-to-r from-navy-800 to-blue-900 rounded-2xl p-8 md:p-12 text-white mb-16">
            <h2 className="text-3xl font-bold mb-6">Event Highlights</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-blue-300 mb-2">15+</div>
                <p className="text-gray-200">Competition Modules</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-300 mb-2">500+</div>
                <p className="text-gray-200">Expected Participants</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-300 mb-2">3 Days</div>
                <p className="text-gray-200">Of Innovation</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-800 mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-navy-800 mb-2">Excellence</h3>
                <p className="text-gray-600 text-sm">Striving for the highest standards</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="font-bold text-navy-800 mb-2">Collaboration</h3>
                <p className="text-gray-600 text-sm">Building together as a community</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="font-bold text-navy-800 mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm">Embracing creative solutions</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="font-bold text-navy-800 mb-2">Growth</h3>
                <p className="text-gray-600 text-sm">Continuous learning and improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}