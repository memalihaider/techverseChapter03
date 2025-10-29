'use client'
import { useState } from 'react'

export default function ModulesSection() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  // Track which module's popup is open (by id), or null if none
  const [popupModuleId, setPopupModuleId] = useState<string | null>(null)

  const modules = [
    {
      id: 'ai-hackathon',
      name: 'AI Hackathon',
      description: 'Develop innovative AI-based solutions within given theme and time limit.',
      events: ['Idea Development', 'Innovation', 'Implementation', 'Presentation'],
      icon: '🧠',
      color: 'from-navy-500 to-blue-600',
      prize: 'Top 3 Positions',
      teamSize: '2-4 members',
      entryFee: 'PKR 2,500',
      category: 'ai'
    },
    {
      id: 'ctf',
      name: 'Capture The Flag',
      description: 'Solve cybersecurity challenges, capture flags, gain points.',
      events: ['Web Exploitation', 'OSINT', 'Cryptography', 'Forensics'],
      icon: '🔒',
      color: 'from-blue-500 to-navy-600',
      prize: 'Winner + Runner-up',
      teamSize: 'Up to 4 members',
      entryFee: 'PKR 2,500',
      category: 'security'
    },
    {
      id: 'fifa',
      name: 'EAFC / FIFA 26',
      description: 'Fast-paced gaming showdown to crown the ultimate EAFC champion.',
      events: ['Knockout 1v1', 'Tournament Format'],
      icon: '⚽',
      color: 'from-navy-600 to-blue-500',
      prize: 'Trophy + Cash Prize',
      teamSize: 'Solo',
      entryFee: 'PKR 1,000',
      category: 'gaming'
    },
    {
      id: 'line-following',
      name: 'Line Following Robot',
      description: 'Robots follow designated black line track with speed and accuracy.',
      events: ['Speed Challenge', 'Stability Test', 'Track Completion'],
      icon: '🤖',
      color: 'from-blue-600 to-navy-500',
      prize: 'Top 3 Teams',
      teamSize: 'Up to 4 members',
      entryFee: 'PKR 1,500',
      category: 'robotics'
    },
    {
      id: 'obstacle-avoidance',
      name: 'Obstacle Avoidance Robot',
      description: 'Autonomous robots detect and avoid obstacles while reaching goal.',
      events: ['Autonomous Navigation', 'Obstacle Detection', 'Goal Achievement'],
      icon: '🛸',
      color: 'from-navy-500 to-blue-600',
      prize: 'Top 3 Teams',
      teamSize: 'Up to 4 members',
      entryFee: 'PKR 1,500',
      category: 'robotics'
    },
    {
      id: 'project-showcase',
      name: 'Project Showcase',
      description: 'Present unique tech project — hardware, software, AI, robotics.',
      events: ['Innovation Demo', 'Design Presentation', 'Tech Showcase'],
      icon: '💡',
      color: 'from-blue-500 to-navy-600',
      prize: 'Innovation Awards',
      teamSize: 'Up to 3 members',
      entryFee: 'PKR 2,000',
      category: 'innovation'
    },
    {
      id: 'pubg',
      name: 'PUBG LAN',
      description: 'Competitive LAN survival battle to determine ultimate squad.',
      events: ['Squad Battles', 'LAN Competition', 'Survival Mode'],
      icon: '🎮',
      color: 'from-navy-600 to-blue-500',
      prize: 'Major Squad Reward',
      teamSize: '4 players (squad)',
      entryFee: 'PKR 2,000',
      category: 'gaming'
    },
    {
      id: 'scavenger-hunt',
      name: 'Scavenger Hunt',
      description: 'Campus Clue Mania - Solve riddles, crack codes, find checkpoints.',
      events: ['Riddle Solving', 'Code Cracking', 'Campus Navigation'],
      icon: '🕵️',
      color: 'from-blue-600 to-navy-500',
      prize: 'First Team Wins',
      teamSize: '3-5 members',
      entryFee: 'PKR 2,000',
      category: 'puzzle'
    },
    {
      id: 'speed-programming',
      name: 'Speed Programming',
      description: 'Solve multiple programming problems under strict timer.',
      events: ['C/C++', 'Python', 'Java', 'Algorithm Challenges'],
      icon: '💻',
      color: 'from-navy-500 to-blue-600',
      prize: 'Fastest Coders',
      teamSize: '2-3 members',
      entryFee: 'PKR 2,500',
      category: 'programming'
    },
    {
      id: 'speed-wiring',
      name: 'Speed Wiring',
      description: 'Electronics wiring challenge — precision + speed decide winner.',
      events: ['Circuit Wiring', 'Precision Test', 'Speed Challenge'],
      icon: '⚡',
      color: 'from-blue-500 to-navy-600',
      prize: 'Wiring Champion',
      teamSize: 'Solo or Duo',
      entryFee: 'PKR 1,500',
      category: 'electronics'
    },
    {
      id: 'sumo-robot',
      name: 'Sumo Robot War',
      description: 'Autonomous robots push opponents out of ring—power and strategy.',
      events: ['Lightweight Category', 'Heavyweight Category', 'Robot Inspection'],
      icon: '🥊',
      color: 'from-navy-600 to-blue-500',
      prize: 'Category Winners',
      teamSize: 'Up to 3 members',
      entryFee: 'PKR 2,000',
      category: 'robotics'
    },
    {
      id: 'tekken',
      name: 'Tekken 8',
      description: 'Knockout brackets tournament to crown ultimate fighting champion.',
      events: ['Knockout Brackets', 'Fighting Tournament'],
      icon: '👊',
      color: 'from-blue-600 to-navy-500',
      prize: 'Champion Trophy + Reward',
      teamSize: 'Solo',
      entryFee: 'PKR 1,000',
      category: 'gaming'
    },
    {
      id: 'ui-ux',
      name: 'UI/UX Design',
      description: 'Design complete user-friendly interface based on given prompt.',
      events: ['Interface Design', 'User Experience', 'Aesthetic Evaluation'],
      icon: '🎨',
      color: 'from-navy-500 to-blue-600',
      prize: 'Design Excellence',
      teamSize: '1-3 members',
      entryFee: 'PKR 2,000',
      category: 'design'
    },
    {
      id: 'valorant',
      name: 'Valorant',
      description: 'Standard competitive mode tournament for tactical shooter champions.',
      events: ['Competitive Mode', 'Team Strategy', 'Tactical Combat'],
      icon: '🎯',
      color: 'from-blue-500 to-navy-600',
      prize: 'Trophy + Cash Reward',
      teamSize: '5 players',
      entryFee: 'PKR 2,500',
      category: 'gaming'
    },
    {
      id: 'web-hackathon',
      name: 'Web Hackathon',
      description: 'Build and deploy complete web project in limited time.',
      events: ['UI/UX Development', 'Performance', 'Creativity', 'Deployment'],
      icon: '🌐',
      color: 'from-navy-600 to-blue-500',
      prize: 'Web Development Awards',
      teamSize: '2-4 members',
      entryFee: 'PKR 2,500',
      category: 'programming'
    },
    {
      id: 'hack-the-box',
      name: 'Hack The Box Workshop',
      description: 'Live cybersecurity training: walkthroughs, attack techniques.',
      events: ['Security Training', 'Attack Techniques', 'HTB Platform', 'Certification'],
      icon: '🛡️',
      color: 'from-blue-600 to-navy-500',
      prize: 'Digital Certificate',
      teamSize: 'Individual',
      entryFee: 'FREE',
      category: 'security'
    }
  ]

  const filters = [
    { id: 'all', name: 'All Modules', count: modules.length },
    { id: 'gaming', name: 'Gaming', count: modules.filter(m => m.category === 'gaming').length },
    { id: 'programming', name: 'Programming', count: modules.filter(m => m.category === 'programming').length },
    { id: 'robotics', name: 'Robotics', count: modules.filter(m => m.category === 'robotics').length },
    { id: 'security', name: 'Security', count: modules.filter(m => m.category === 'security').length },
    { id: 'ai', name: 'AI', count: modules.filter(m => m.category === 'ai').length },
    { id: 'design', name: 'Design', count: modules.filter(m => m.category === 'design').length },
    { id: 'innovation', name: 'Innovation', count: modules.filter(m => m.category === 'innovation').length },
    { id: 'electronics', name: 'Electronics', count: modules.filter(m => m.category === 'electronics').length },
    { id: 'puzzle', name: 'Puzzle', count: modules.filter(m => m.category === 'puzzle').length }
  ]

  const filteredModules = selectedFilter === 'all' 
    ? modules 
    : modules.filter(module => module.category === selectedFilter)

  return (
    <section className="py-20 bg-gradient-to-br from-navy-25 via-white to-blue-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-800 mb-6">
            Techverse Chapter 2
            <span className="block text-blue-600">16 Competition Modules</span>
          </h2>
          <p className="text-lg sm:text-xl text-navy-600 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8">
            Choose from 16 exciting competition modules ranging from AI and cybersecurity to gaming and robotics. 
            Over 2,000 participants expected across all categories with prizes for top performers.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-navy-50 border border-navy-200 rounded-lg px-4 py-2">
              <span className="text-navy-800 font-semibold">16 Modules</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <span className="text-blue-800 font-semibold">2,000+ Expected Participants</span>
            </div>
            <div className="bg-navy-50 border border-navy-200 rounded-lg px-4 py-2">
              <span className="text-navy-800 font-semibold">Entry Fees: PKR 1,000 - 2,500</span>
            </div>
          </div>
          
          {/* Decorative Line */}
          <div className="flex justify-center">
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-navy-400 to-blue-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-navy-600 to-blue-600 text-white shadow-lg scale-105'
                    : 'bg-navy-50 text-navy-700 hover:bg-navy-100 hover:scale-105'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {filter.name}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedFilter === filter.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-navy-200 text-navy-600'
                  }`}>
                    {filter.count}
                  </span>
                </span>
                {selectedFilter === filter.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-600 to-blue-600 rounded-full blur-sm opacity-50"></div>
                )}
              </button>
            ))}
          </div>
          
          {/* Filter Results */}
          <div className="text-center">
            <p className="text-navy-600">
              Showing <span className="font-semibold text-navy-800">{filteredModules.length}</span> module{filteredModules.length !== 1 ? 's' : ''} 
              {selectedFilter !== 'all' && (
                <span> in <span className="font-semibold text-blue-600">{filters.find(f => f.id === selectedFilter)?.name}</span></span>
              )}
            </p>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {filteredModules.map((module, index) => (
            <div
              key={module.id}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 animate-slideUp"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Holographic Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-navy-400 via-blue-400 to-navy-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm"></div>
              
              {/* Content Container */}
              <div className="relative z-10 p-6 h-full flex flex-col">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {module.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-navy-800 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {module.name}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Entry Fee Badge */}
                  <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    module.entryFee === 'FREE' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-navy-100 text-navy-700'
                  }`}>
                    {module.entryFee}
                  </div>
                </div>

                {/* Description */}
                <p className="text-navy-600 text-xs leading-relaxed mb-4 flex-1">
                  {module.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-navy-50/50 backdrop-blur-sm rounded-lg p-2 border border-navy-100/50">
                    <div className="text-xs text-navy-500">Team Size</div>
                    <div className="text-xs font-semibold text-navy-700">{module.teamSize}</div>
                  </div>
                  <div className="bg-blue-50/50 backdrop-blur-sm rounded-lg p-2 border border-blue-100/50">
                    <div className="text-xs text-blue-500">Prize</div>
                    <div className="text-xs font-semibold text-blue-700">{module.prize}</div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-4">
                  <div className="text-xs font-semibold text-navy-700 mb-2">Key Features</div>
                  <div className="space-y-1">
                    {module.events.slice(0, 2).map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-center text-xs text-navy-600">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                        <span className="truncate">{event}</span>
                      </div>
                    ))}
                    {module.events.length > 2 && (
                      <div className="text-xs text-navy-500">+{module.events.length - 2} more</div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className="w-full py-2 bg-gradient-to-r from-navy-600/80 to-blue-600/80 backdrop-blur-sm text-white text-xs font-semibold rounded-lg hover:from-navy-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-white/10"
                  onClick={() => setPopupModuleId(module.id)}
                >
                  Register Now
                </button>
      {/* Registration Popup Modal (per module) */}
      {popupModuleId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-xs w-full text-center relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setPopupModuleId(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-3xl mb-2">🗓️</div>
            <h3 className="text-lg font-bold mb-2 text-navy-800">Registration Coming Soon!</h3>
            <p className="text-gray-700 mb-2 text-sm">
              Registration for <span className="font-semibold text-blue-600">{modules.find(m => m.id === popupModuleId)?.name}</span> will open on <span className="font-semibold text-blue-600">November 15th</span>, Inshallah.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={() => setPopupModuleId(null)}
            >
              OK
            </button>
          </div>
        </div>
      )}

                {/* Futuristic Corner Element */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-300/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-navy-300/30 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-navy-50 to-blue-50 p-6 sm:p-8 rounded-2xl border border-navy-200 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-navy-800 mb-4">
              Ready to Join Techverse Chapter 2?
            </h3>
            <p className="text-navy-600 mb-6 text-base sm:text-lg leading-relaxed">
              With 16 diverse competition modules and over 2,000 expected participants, this is your chance to 
              compete with Pakistan's brightest tech minds. Entry fees range from PKR 1,000 to 2,500.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/registration"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-navy-600 to-blue-600 text-white font-bold rounded-xl hover:from-navy-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Register for Modules</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/modules"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-navy-600 text-navy-600 font-bold rounded-xl hover:bg-navy-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <span>View Complete Guide</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}