'use client'
import Footer from '@/components/Footer'

export default function RulesPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-[320px] bg-gradient-to-br from-blue-900 via-blue-700 to-purple-700 flex items-center justify-center py-16 mb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/hero-bg.svg')] bg-cover bg-center pointer-events-none" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Techverse
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 font-medium max-w-2xl mx-auto">
            Rules, Terms & Conditions & Privacy Policy
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* General Rules and Guidelines */}
        <section className="mb-10">
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 md:p-10 border-t-4 border-blue-600 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
              <h2 className="text-2xl font-bold text-navy-800">General Rules and Guidelines</h2>
            </div>
            <ul className="space-y-3 text-gray-700 text-base">
              <li><span className="font-semibold text-blue-700">No use of prohibited items:</span> Use of drugs, vapes, cigarettes or any form of intoxicants is strictly prohibited within the University of Management and Technology (UMT) premises and during all event activities. Violation will result in immediate disqualification and referral to the UMT Disciplinary Committee.</li>
              <li><span className="font-semibold text-blue-700">Respect event staff and volunteers:</span> All participants are expected to behave respectfully with organizing team members, volunteers, faculty and fellow participants.</li>
              <li><span className="font-semibold text-blue-700">Judges' decision is final:</span> For all competitions, the decision made by the panel of judges will be considered final and binding. No objections or challenges will be entertained.</li>
              <li><span className="font-semibold text-blue-700">Event property and materials:</span> Any damage to university property, event equipment or competition materials will result in penalties and will be the participant’s sole responsibility, including liability for cost. This may also result in removal from the event.</li>
              <li><span className="font-semibold text-blue-700">Identification and verification:</span> Participants must carry their university ID or CNIC and Techverse Registration Card at all times for entry and verification.</li>
              <li><span className="font-semibold text-blue-700">Maintain decorum:</span> Participants are expected to maintain proper attire and behavior during formal and informal segments like workshops, competitions, and social events.</li>
              <li><span className="font-semibold text-blue-700">Punctuality is required:</span> Be on time for all events. Late arrivals may lead to disqualification or denied entry for specific activities.</li>
              <li><span className="font-semibold text-blue-700">Respect performance boundaries:</span> During social events, any unruly or offensive behavior will result in immediate action.</li>
            </ul>
          </div>
        </section>

        {/* Terms and Conditions */}
        <section className="mb-10">
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 md:p-10 border-t-4 border-purple-600 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01.88 7.903A4.5 4.5 0 1112 6.5" /></svg>
              <h2 className="text-2xl font-bold text-navy-800">Terms and Conditions</h2>
            </div>
            <ul className="space-y-3 text-gray-700 text-base">
              <li><span className="font-semibold text-purple-700">Eligibility:</span> All university students with valid institutional identification are eligible to participate.</li>
              <li><span className="font-semibold text-purple-700">Registration confirmation:</span> Only those who have successfully completed the online registration and received confirmation will be eligible for participation.</li>
              <li><span className="font-semibold text-purple-700">Changes to event schedule:</span> The organizing team reserves the right to alter the schedule, timing or lineup of competitions, workshops or social events without prior notice.</li>
              <li><span className="font-semibold text-purple-700">Formal dinner and competition kits:</span> Participants who register will be eligible for:
                <ul className="list-disc pl-6 mt-2">
                  <li>Formal Dinner (for winners and top achievers)</li>
                  <li>Competition materials (based on their selected categories)</li>
                </ul>
              </li>
              <li><span className="font-semibold text-purple-700">Disqualification clause:</span> Any participant found violating rules, disturbing other attendees or disrespecting the team will be disqualified without refund or reconsideration.</li>
              <li><span className="font-semibold text-purple-700">Code of conduct:</span> Participants are expected to follow all UMT and Techverse policies. The organizing team reserves the right to refuse entry or remove participants who fail to comply.</li>
              <li><span className="font-semibold text-purple-700">No refund policy:</span> All registration fees are non-refundable under any circumstances, including disqualification, withdrawal, or absence.</li>
              <li><span className="font-semibold text-purple-700">No addition/replacement policy:</span> Once registration is confirmed, no addition or replacement of team members will be allowed.</li>
            </ul>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="mb-10">
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 md:p-10 border-t-4 border-blue-400 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              <h2 className="text-2xl font-bold text-navy-800">Privacy Policy</h2>
            </div>
            <ul className="space-y-3 text-gray-700 text-base">
              <li><span className="font-semibold text-blue-500">Data collection:</span> We only collect data necessary for registration, identity verification, and participation tracking (e.g. name, contact info, university name, CNIC or student ID).</li>
              <li><span className="font-semibold text-blue-500">Data usage:</span> Your data will be used solely for the purpose of:
                <ul className="list-disc pl-6 mt-2">
                  <li>Verifying event participation</li>
                  <li>Generating certificates</li>
                  <li>Providing event updates and schedules</li>
                </ul>
              </li>
              <li><span className="font-semibold text-blue-500">Data sharing:</span> Your personal data will not be shared with third parties without your explicit consent, except in case of disciplinary action or law enforcement requests.</li>
              <li><span className="font-semibold text-blue-500">Data security:</span> All data is stored securely and will be deleted after the event ends unless needed for issuing certificates or follow-up communication (e.g., feedback or future events).</li>
              <li><span className="font-semibold text-blue-500">Consent:</span> By registering, you give Techverse permission to use your name and photographs captured during the event for promotional or documentation purposes.</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="bg-gradient-to-r from-navy-800 to-blue-900 rounded-2xl p-8 md:p-10 text-white flex flex-col items-center shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5a8.38 8.38 0 01-.9 3.8c-.6 1.2-1.5 2.3-2.6 3.2-1.1.9-2.4 1.5-3.8 1.5s-2.7-.6-3.8-1.5c-1.1-.9-2-2-2.6-3.2A8.38 8.38 0 013 10.5C3 6.4 6.4 3 10.5 3S18 6.4 18 10.5z" /></svg>
              For Queries
            </h2>
            <p className="mb-2 text-lg">Email: <span className="text-blue-200 font-mono">techverse@umt.edu.pk</span></p>
            <p className="text-lg">Phone: <span className="text-blue-200 font-mono">+92 300 1234567</span></p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}