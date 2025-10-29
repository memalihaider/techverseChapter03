export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 opacity-5 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-navy-300 opacity-5 rounded-full translate-x-40 translate-y-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Main Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Techverse 2026
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-navy-400 rounded-full"></div>
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed text-lg">
              Pakistan's largest technology competition bringing together the brightest minds 
              in programming, gaming, cybersecurity, robotics, and innovation. Join us for 
              three days of cutting-edge competition and networking.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-8">
              <a href="#" className="group p-3 bg-navy-700/50 rounded-lg hover:bg-blue-600/50 transition-all duration-300 hover:scale-110">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">📧</span>
              </a>
              <a href="#" className="group p-3 bg-navy-700/50 rounded-lg hover:bg-blue-600/50 transition-all duration-300 hover:scale-110">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">📱</span>
              </a>
              <a href="#" className="group p-3 bg-navy-700/50 rounded-lg hover:bg-blue-600/50 transition-all duration-300 hover:scale-110">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🐦</span>
              </a>
              <a href="#" className="group p-3 bg-navy-700/50 rounded-lg hover:bg-blue-600/50 transition-all duration-300 hover:scale-110">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">📘</span>
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-navy-700/30 backdrop-blur-sm border border-blue-300/20 rounded-xl p-4 sm:p-6">
              <h4 className="text-lg sm:text-xl font-semibold mb-3 text-blue-200">Stay Updated</h4>
              <p className="text-blue-100 mb-4 text-sm sm:text-base">Get the latest updates about Techverse 2026</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-navy-800/50 border border-blue-300/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 text-sm sm:text-base"
                />
                <button className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-navy-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-navy-700 transition-all duration-300 text-sm sm:text-base">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-blue-200">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Competition Modules', href: '/modules' },
                { name: 'Registration', href: '/registration' },
                { name: 'Rules & Guidelines', href: '/rules' },
                { name: 'Event Schedule', href: '/schedule' },
                { name: 'Prize Distribution', href: '/prizes' },
                { name: 'Sponsors', href: '/sponsors' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <svg className="w-4 h-4 mr-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-blue-200">Contact Info</h4>
            <ul className="space-y-4">
              {[
                { icon: '📧', text: 'techverse@umt.edu.pk', type: 'email' },
                { icon: '📱', text: '+92 300 1234567', type: 'phone' },
                { icon: '📍', text: 'Lahore, Pakistan', type: 'location' },
                { icon: '🗓️', text: 'March 15-17, 2026', type: 'date' }
              ].map((contact, index) => (
                <li key={index} className="flex items-center text-blue-100 group">
                  <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-200">
                    {contact.icon}
                  </span>
                  <span className="group-hover:text-white transition-colors duration-200">
                    {contact.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Event Stats */}
            <div className="mt-8 p-4 bg-navy-700/30 backdrop-blur-sm border border-blue-300/20 rounded-xl">
              <h5 className="text-lg font-semibold mb-3 text-blue-200">Event Stats</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-100">Prize Pool:</span>
                  <span className="text-white font-semibold">₨500,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Participants:</span>
                  <span className="text-white font-semibold">2,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Modules:</span>
                  <span className="text-white font-semibold">16</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-navy-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 mb-4 md:mb-0">
              © 2026 Techverse. All rights reserved. Built with ❤️ for Pakistan's tech community.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-blue-100 hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="/terms" className="text-blue-100 hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="/cookies" className="text-blue-100 hover:text-white transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
          
          {/* Tech Stack */}
          <div className="mt-6 text-center">
            <p className="text-blue-300 text-sm">
              Powered by Next.js • Supabase • Tailwind CSS • TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}