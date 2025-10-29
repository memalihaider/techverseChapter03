'use client'
import { useState } from 'react'
import { RegistrationData, TeamMember } from './page'

interface TeamMembersFormProps {
  data: RegistrationData
  updateData: (data: Partial<RegistrationData>) => void
  onNext: () => void
  onPrev: () => void
}

export default function TeamMembersForm({ data, updateData, onNext, onPrev }: TeamMembersFormProps) {
  const [errors, setErrors] = useState<{[index: number]: Partial<TeamMember>}>({})

  const selectedModule = data.selectedModule
  if (!selectedModule) return null

  const requiredMembers = selectedModule.minTeamSize - 1 // Exclude team leader
  const maxAdditionalMembers = selectedModule.maxTeamSize - 1

  const addMember = () => {
    if (data.teamMembers.length < maxAdditionalMembers) {
      updateData({
        teamMembers: [...data.teamMembers, {
          fullName: '',
          email: '',
          phone: '',
          cnic: '',
          university: '',
          studentId: ''
        }]
      })
    }
  }

  const removeMember = (index: number) => {
    const newMembers = data.teamMembers.filter((_, i) => i !== index)
    updateData({ teamMembers: newMembers })
  }

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...data.teamMembers]
    newMembers[index] = { ...newMembers[index], [field]: value }
    updateData({ teamMembers: newMembers })
  }

  const validateMembers = () => {
    const newErrors: {[index: number]: Partial<TeamMember>} = {}
    let hasErrors = false

    // Check if we have enough members
    if (data.teamMembers.length < requiredMembers) {
      alert(`This module requires at least ${requiredMembers} additional team member(s) besides the team leader.`)
      return false
    }

    // Validate each member
    data.teamMembers.forEach((member, index) => {
      const memberErrors: Partial<TeamMember> = {}

      if (!member.fullName.trim()) memberErrors.fullName = 'Full name is required'
      if (!member.email.trim()) memberErrors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(member.email)) memberErrors.email = 'Email is invalid'
      if (!member.phone.trim()) memberErrors.phone = 'Phone number is required'
      else if (!/^03\d{2}-\d{7}$/.test(member.phone)) memberErrors.phone = 'Phone format: 03XX-XXXXXXX'
      if (!member.cnic.trim()) memberErrors.cnic = 'CNIC is required'
      else if (!/^\d{5}-\d{7}-\d$/.test(member.cnic)) memberErrors.cnic = 'CNIC format: XXXXX-XXXXXXX-X'
      if (!member.university.trim()) memberErrors.university = 'University is required'
      if (!member.studentId.trim()) memberErrors.studentId = 'Student ID is required'

      if (Object.keys(memberErrors).length > 0) {
        newErrors[index] = memberErrors
        hasErrors = true
      }
    })

    setErrors(newErrors)
    return !hasErrors
  }

  const handleNext = () => {
    if (validateMembers()) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Team Members</h2>
        <p className="text-sm text-gray-600">
          Add team members for <strong>{selectedModule.name}</strong>. 
          You need {requiredMembers} to {maxAdditionalMembers} additional member(s) besides the team leader.
        </p>
      </div>

      {/* Team Leader Info (Read-only) */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Team Leader</h3>
        <div className="text-sm text-gray-600">
          <p><strong>{data.teamLeader.fullName}</strong></p>
          <p>{data.teamLeader.email} • {data.teamLeader.phone}</p>
          <p>{data.teamLeader.university}</p>
        </div>
      </div>

      {/* Team Members */}
      <div className="space-y-6">
        {data.teamMembers.map((member, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-medium text-gray-900">Team Member {index + 1}</h3>
              {data.teamMembers.length > requiredMembers && (
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  value={member.fullName}
                  onChange={(e) => updateMember(index, 'fullName', e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors[index]?.fullName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[index]?.fullName && <p className="mt-1 text-sm text-red-600">{errors[index]?.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => updateMember(index, 'email', e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors[index]?.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[index]?.email && <p className="mt-1 text-sm text-red-600">{errors[index]?.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone *</label>
                <input
                  type="tel"
                  value={member.phone}
                  onChange={(e) => updateMember(index, 'phone', e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors[index]?.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[index]?.phone && <p className="mt-1 text-sm text-red-600">{errors[index]?.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">CNIC *</label>
                <input
                  type="text"
                  value={member.cnic}
                  onChange={(e) => updateMember(index, 'cnic', e.target.value)}
                  placeholder="XXXXX-XXXXXXX-X"
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors[index]?.cnic ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[index]?.cnic && <p className="mt-1 text-sm text-red-600">{errors[index]?.cnic}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">University *</label>
                <input
                  type="text"
                  value={member.university}
                  onChange={(e) => updateMember(index, 'university', e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors[index]?.university ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[index]?.university && <p className="mt-1 text-sm text-red-600">{errors[index]?.university}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Student ID *</label>
                <input
                  type="text"
                  value={member.studentId}
                  onChange={(e) => updateMember(index, 'studentId', e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors[index]?.studentId ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[index]?.studentId && <p className="mt-1 text-sm text-red-600">{errors[index]?.studentId}</p>}
              </div>
            </div>
          </div>
        ))}

        {/* Add Member Button */}
        {data.teamMembers.length < maxAdditionalMembers && (
          <button
            type="button"
            onClick={addMember}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
          >
            <div className="text-gray-600">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="mt-2 block text-sm font-medium">Add Team Member</span>
            </div>
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next: Payment Details
        </button>
      </div>
    </div>
  )
}