'use client'
import Footer from '@/components/Footer'

export default function SchedulePage() {
  // prettier-ignore
  const schedule = [
    {
      day: 'Day 1',
      date: '________________',
      events: [
        { time: '08:30 AM – 09:30 AM', title: 'Registration & Welcome Briefing', venue: 'Main Gate / Cb1' },
        { time: '09:30 AM – 11:00 AM', title: 'Opening Ceremony', venue: 'Hakeem Saeed Hall' },
        { time: '11:30 AM – 5:30 PM', title: 'AI Hackathon', venue: 'FYP-2 (611)' },
        { time: '12:30 AM – 5:30 PM', title: 'UI/UX', venue: 'TBA' },
        { time: '11:30 AM – 5:30 PM', title: 'FIFA', venue: 'SEN 305' },
        { time: '11:30 AM – 5:30 PM', title: 'Tekken', venue: 'Sen 307' },
        { time: '11:30 AM – 5:30 PM', title: 'Valorant', venue: 'CB1 501' },
        { time: '11:30 AM – 5:30 PM', title: 'PUBG', venue: 'FYP 1- STD Building' },
        { time: '1:00 PM – 05:30 PM', title: 'Web Development', venue: 'CB2 702,802' },
        { time: '1:00 PM – 4:30 PM', title: 'Speed Wiring', venue: 'DLD Lab' },
        { time: '1:00 PM – 5:30 PM', title: 'Capture the Flag (CTF)', venue: 'CB2 602' },
        { time: '02:30 PM – 04:30 PM', title: 'Guest Speaker Session/Workshop', venue: '1C17 (Saleem Asghar Hall)' },
        { time: '05:30 PM onwards', title: 'Drama / Jamming', venue: 'Hakeem Saeed Hall' },
      ]
    },
    {
      day: 'Day 2',
      date: '________________',
      events: [
        { time: '09:00 AM – 10:00 AM', title: 'Registration & Welcome Briefing', venue: 'Main Gate / Cb1' },
        { time: '11:00 AM – 4:00 PM', title: 'Speed Programming', venue: 'CB2 702,802' },
        { time: '10:00 AM – 05:30 PM', title: 'AI Hackathon', venue: 'FYP-2 (611)' },
        { time: '11:00 AM – 5:30 PM', title: 'FIFA', venue: 'CB2 203' },
        { time: '11:00 AM – 5:30 PM', title: 'Tekken', venue: 'CB2 305' },
        { time: '11:00 AM – 5:30 PM', title: 'Valorant', venue: 'CB1 501' },
        { time: '10:00 AM – 5:30 PM', title: 'PUBG', venue: 'FYP-1 STD' },
        { time: '10:00 AM – 1:30 PM', title: 'LFR & Obstacle', venue: 'STD 314' },
        { time: '12:30 AM – 5:30 PM', title: 'UI/UX', venue: '' },
        { time: '2:00 PM – 5:30 PM', title: 'Sumo War', venue: 'STD 319' },
        { time: '11:00 AM – 5:30 PM', title: 'Web Development', venue: 'CB2 702,802' },
        { time: '10:30 AM – 12:30 PM', title: 'Hack the Box Meetup', venue: '1C17 (Saleem Asghar)' },
        { time: '12:30 PM – 4:30 PM', title: 'Project Showcase', venue: 'CB2 602' },
        { time: '05:30 PM onwards', title: 'Qawali Night', venue: 'Hakeem Saeed Hall' },
      ]
    },
    {
      day: 'Day 3',
      date: '________________',
      events: [
        { time: '9:30 AM – 01:00 PM', title: 'Time Reserved for Contingencies or Overflow Finals', venue: 'Venues TBD' },
        { time: '9:30 AM – 11:00 AM', title: 'AI Hackathon+ Submission', venue: 'FYP-2 (611 STD)' },
        { time: '9:30 AM – 1:00 PM', title: 'Scavenger Hunt', venue: 'Campus-Wide' },
        { time: '10:00 AM – 1:00 PM', title: 'Judging', venue: 'CB1 304-B, CB1 306 B' },
        { time: '01:30 PM – 04:30 PM', title: 'Awards & Certificates Distribution', venue: 'Hakeem Saeed Hall' },
        { time: '04:30 PM onwards', title: 'Formal Dinner & Closing Ceremony', venue: 'TBA' },
      ]
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mb-6">
              Event <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Schedule</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              3 days of intense competition, learning, and networking
            </p>
          </div>

          {/* Schedule Table */}
          <div className="space-y-12">
            {schedule.map((day, dayIndex) => (
              <div key={dayIndex} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="border-l-4 border-blue-600 pl-6 mb-8">
                  <h2 className="text-3xl font-bold text-navy-800">{day.day}</h2>
                  <p className="text-gray-600 text-lg">{day.date}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Time</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Module/Activity</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Venue</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {day.events.map((event, eventIndex) => (
                        <tr key={eventIndex}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-800 font-semibold">{event.time}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-navy-800">{event.title}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{event.venue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <div className="bg-gradient-to-r from-navy-800 to-blue-900 rounded-2xl p-8 text-white mt-12">
            <h2 className="text-2xl font-bold mb-6">Important Notes</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-300 mr-3">•</span>
                <p>All times are in local timezone. Please arrive 15 minutes early for each session.</p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-3">•</span>
                <p>Lunch and refreshments will be provided throughout the event.</p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-3">•</span>
                <p>Schedule is subject to minor changes. Updates will be announced on-site.</p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-3">•</span>
                <p>Mentors will be available during designated hours and by appointment.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}