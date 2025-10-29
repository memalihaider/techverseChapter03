export default function RewardsSection() {
  const prizes = [
    {
      category: "Programming",
      total: "₨60,000",
      events: [
        { name: "Speed Programming", prize: "₨30,000" },
        { name: "Web Development", prize: "₨30,000" }
      ],
      color: "bg-blue-500"
    },
    {
      category: "Gaming", 
      total: "₨45,000",
      events: [
        { name: "Valorant", prize: "₨25,000" },
        { name: "Tekken 8", prize: "₨20,000" }
      ],
      color: "bg-purple-500"
    },
    {
      category: "Security",
      total: "₨30,000", 
      events: [
        { name: "Capture The Flag", prize: "₨30,000" }
      ],
      color: "bg-red-500"
    },
    {
      category: "Innovation",
      total: "₨25,000",
      events: [
        { name: "Project Showcase", prize: "₨15,000" },
        { name: "Line Following Robot", prize: "₨10,000" }
      ],
      color: "bg-green-500"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Prize Pool</h2>
          <p className="text-xl text-gray-600">Over ₨500,000 in total rewards</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className={`${category.color} text-white p-4 text-center`}>
                <h3 className="text-xl font-bold">{category.category}</h3>
                <div className="text-2xl font-bold mt-2">{category.total}</div>
              </div>
              <div className="p-4">
                {category.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700">{event.name}</span>
                    <span className="font-semibold text-indigo-600">{event.prize}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}