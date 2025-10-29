export default function EventHighlights() {
  const highlights = [
    {
      title: "Largest Tech Event",
      description: "Join Pakistan's biggest technology competition with participants from across the country",
      icon: "🌟"
    },
    {
      title: "Industry Mentorship",
      description: "Learn from experienced professionals and industry leaders throughout the event",
      icon: "👨‍🏫"
    },
    {
      title: "Networking Opportunities", 
      description: "Connect with like-minded individuals and build lasting professional relationships",
      icon: "🤝"
    },
    {
      title: "Career Opportunities",
      description: "Get noticed by top tech companies and explore exciting career prospects",
      icon: "🚀"
    }
  ]

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Techverse 2026?</h2>
          <p className="text-xl text-gray-300">Experience the future of technology</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{highlight.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
              <p className="text-gray-300">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}