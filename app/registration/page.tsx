'use client'
import { useState } from 'react'
import TeamInfoForm from './TeamInfoForm'
import ModuleSelection from './ModuleSelection'
import TeamMembersForm from './TeamMembersForm'
import PaymentDetails from './PaymentDetails'

export interface TeamLeader {
  fullName: string
  email: string
  phone: string
  cnic: string
  university: string
  studentId: string
}

export interface TeamMember {
  fullName: string
  email: string
  phone: string
  cnic: string
  university: string
  studentId: string
}

export interface Module {
  id: string
  name: string
  category: string
  entryFee: number
  minTeamSize: number
  maxTeamSize: number
  description: string
}

export interface RegistrationData {
  teamName: string
  teamLeader: TeamLeader
  selectedModule: Module | null
  teamMembers: TeamMember[]
  paymentMethod: string
  transactionId: string
  paymentProof: File | null
}

const steps = [
  { id: 1, name: 'Team Information', description: 'Basic team and leader details' },
  { id: 2, name: 'Module Selection', description: 'Choose competition category' },
  { id: 3, name: 'Team Members', description: 'Add team member details' },
  { id: 4, name: 'Payment', description: 'Process entry fees and upload proof' }
]


export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    teamName: '',
    teamLeader: {
      fullName: '',
      email: '',
      phone: '',
      cnic: '',
      university: '',
      studentId: ''
    },
    selectedModule: null,
    teamMembers: [],
    paymentMethod: '',
    transactionId: '',
    paymentProof: null
  })

  // Popup for registration not open
  const [showComingSoon, setShowComingSoon] = useState(true)

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      // Upload payment proof if exists
      let paymentProofUrl = ''
      if (registrationData.paymentProof) {
        // In production, you would upload to cloud storage (S3, Cloudinary, etc.)
        // For now, we'll use a placeholder URL
        // TODO: Implement actual file upload to cloud storage
        paymentProofUrl = 'https://placeholder.com/payment-proof/' + registrationData.paymentProof.name
        console.log('Payment proof file:', registrationData.paymentProof.name)
      }

      // Prepare registration payload
      const payload = {
        team_name: registrationData.teamName,
        module_id: registrationData.selectedModule?.id,
        team_leader: registrationData.teamLeader,
        team_members: registrationData.teamMembers,
        payment_method: registrationData.paymentMethod || null,
        transaction_id: registrationData.transactionId || null,
        payment_proof_url: paymentProofUrl || null,
        entry_fee: registrationData.selectedModule?.entryFee || 0
      }

      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        alert(`Registration submitted successfully! Your registration number is: ${result.registration.registration_number}`)
        // Reset form
        window.location.href = '/'
      } else {
        throw new Error(result.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed: ' + (error instanceof Error ? error.message : 'Please try again.'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      {/* Registration Coming Soon Popup */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center relative animate-fadeIn">
            <div className="text-5xl mb-4">🚧</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-navy-800">Registration Will Be Open Soon!</h2>
            <p className="text-gray-700 mb-4 text-lg">
              Registration will open in <span className="font-semibold text-blue-600">November</span>.<br/>
              Updates will be posted on our Instagram and YouTube channels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
              <a
                href="https://www.instagram.com/techverse.chapter2/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-yellow-600 transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm6.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg>
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@UMTTechverse"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg hover:from-red-700 hover:to-orange-700 transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.9C16.1 5 12 5 12 5h0s-4.1 0-7.1.1c-.4 0-1.2.1-1.9.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.8 2.1.9C7.9 19 12 19 12 19s4.1 0 7.1-.1c.4 0 1.2-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2zM10 15V9l6 3-6 3z"/></svg>
                YouTube
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {/* Progress Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Team Registration</h1>
            <p className="mt-1 text-sm text-gray-600">Complete all steps to register your team</p>
            {/* ...existing code... */}
          </div>

          {/* Step Content */}
          <div className="px-6 py-6">
            {/* ...existing code... */}
            {currentStep === 1 && (
              <TeamInfoForm
                data={registrationData}
                updateData={updateRegistrationData}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <ModuleSelection
                data={registrationData}
                updateData={updateRegistrationData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 3 && (
              <TeamMembersForm
                data={registrationData}
                updateData={updateRegistrationData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 4 && (
              <PaymentDetails
                data={registrationData}
                updateData={updateRegistrationData}
                onPrev={prevStep}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
