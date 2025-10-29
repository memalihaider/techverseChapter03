'use client'
import { useState } from 'react'
import { RegistrationData, TeamLeader } from './page'

interface TeamInfoFormProps {
  data: RegistrationData
  updateData: (data: Partial<RegistrationData>) => void
  onNext: () => void
}

export default function TeamInfoForm({ data, updateData, onNext }: TeamInfoFormProps) {
  const [errors, setErrors] = useState<Partial<TeamLeader & { teamName: string }>>({})

  const validateForm = () => {
    const newErrors: Partial<TeamLeader & { teamName: string }> = {}

    if (!data.teamName.trim()) newErrors.teamName = 'Team name is required'
    if (!data.teamLeader.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!data.teamLeader.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(data.teamLeader.email)) newErrors.email = 'Email is invalid'
    if (!data.teamLeader.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^03\d{2}-\d{7}$/.test(data.teamLeader.phone)) newErrors.phone = 'Phone format: 03XX-XXXXXXX'
    if (!data.teamLeader.cnic.trim()) newErrors.cnic = 'CNIC is required'
    else if (!/^\d{5}-\d{7}-\d$/.test(data.teamLeader.cnic)) newErrors.cnic = 'CNIC format: XXXXX-XXXXXXX-X'
    if (!data.teamLeader.university.trim()) newErrors.university = 'University is required'
    if (!data.teamLeader.studentId.trim()) newErrors.studentId = 'Student ID is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onNext()
    }
  }

  const updateTeamLeader = (field: keyof TeamLeader, value: string) => {
    updateData({
      teamLeader: {
        ...data.teamLeader,
        [field]: value
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Team Information</h2>
        <p className="text-sm text-gray-600 mb-6">
          Provide your team name and team leader details. The team leader will be the primary contact.
        </p>
      </div>

      {/* Team Name */}
      <div>
        <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
          Team Name *
        </label>
        <input
          type="text"
          id="teamName"
          value={data.teamName}
          onChange={(e) => updateData({ teamName: e.target.value })}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            errors.teamName ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Enter your team name"
        />
        {errors.teamName && <p className="mt-1 text-sm text-red-600">{errors.teamName}</p>}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-md font-medium text-gray-900 mb-4">Team Leader Details</h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              value={data.teamLeader.fullName}
              onChange={(e) => updateTeamLeader('fullName', e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.fullName ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={data.teamLeader.email}
              onChange={(e) => updateTeamLeader('email', e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={data.teamLeader.phone}
              onChange={(e) => updateTeamLeader('phone', e.target.value)}
              placeholder="03XX-XXXXXXX"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          {/* CNIC */}
          <div>
            <label htmlFor="cnic" className="block text-sm font-medium text-gray-700">
              CNIC *
            </label>
            <input
              type="text"
              id="cnic"
              value={data.teamLeader.cnic}
              onChange={(e) => updateTeamLeader('cnic', e.target.value)}
              placeholder="XXXXX-XXXXXXX-X"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.cnic ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.cnic && <p className="mt-1 text-sm text-red-600">{errors.cnic}</p>}
          </div>

          {/* University */}
          <div>
            <label htmlFor="university" className="block text-sm font-medium text-gray-700">
              University/Institution *
            </label>
            <input
              type="text"
              id="university"
              value={data.teamLeader.university}
              onChange={(e) => updateTeamLeader('university', e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.university ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.university && <p className="mt-1 text-sm text-red-600">{errors.university}</p>}
          </div>

          {/* Student ID */}
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
              Student ID *
            </label>
            <input
              type="text"
              id="studentId"
              value={data.teamLeader.studentId}
              onChange={(e) => updateTeamLeader('studentId', e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.studentId ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.studentId && <p className="mt-1 text-sm text-red-600">{errors.studentId}</p>}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next: Select Module
        </button>
      </div>
    </form>
  )
}