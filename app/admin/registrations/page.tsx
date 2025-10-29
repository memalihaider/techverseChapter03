'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Registration {
  id: string
  registration_number: string
  team_name: string
  institution: string
  team_leader_name: string
  team_leader_email: string
  team_leader_phone: string
  primary_module: string
  selected_modules: string[]
  team_size: number
  team_members: any[]
  payment_status: string
  payment_proof_url: string | null
  status: string
  submitted_at: string
  certificate_id: string | null
}

export default function RegistrationsPage() {
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    fetchRegistrations()
  }, [filter])

  const fetchRegistrations = async () => {
    try {
      const url = filter === 'all' 
        ? '/api/admin/registrations'
        : `/api/admin/registrations?status=${filter}`
      
      const response = await fetch(url)
      const data = await response.json()
      setRegistrations(data.registrations || [])
    } catch (error) {
      console.error('Error fetching registrations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    if (!confirm('Are you sure you want to approve this registration?')) return

    setActionLoading(true)
    try {
      const response = await fetch(`/api/admin/registrations/${id}/approve`, {
        method: 'POST'
      })

      if (response.ok) {
        alert('Registration approved! Approval email sent.')
        fetchRegistrations()
        setShowModal(false)
      } else {
        alert('Failed to approve registration')
      }
    } catch (error) {
      console.error('Error approving registration:', error)
      alert('Error approving registration')
    } finally {
      setActionLoading(false)
    }
  }

  const handleReject = async (id: string) => {
    const reason = prompt('Please provide a reason for rejection:')
    if (!reason) return

    setActionLoading(true)
    try {
      const response = await fetch(`/api/admin/registrations/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      })

      if (response.ok) {
        alert('Registration rejected! Rejection email sent.')
        fetchRegistrations()
        setShowModal(false)
      } else {
        alert('Failed to reject registration')
      }
    } catch (error) {
      console.error('Error rejecting registration:', error)
      alert('Error rejecting registration')
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration? This action cannot be undone.')) return

    setActionLoading(true)
    try {
      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Registration deleted successfully')
        fetchRegistrations()
        setShowModal(false)
      } else {
        alert('Failed to delete registration')
      }
    } catch (error) {
      console.error('Error deleting registration:', error)
      alert('Error deleting registration')
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    }
    return styles[status as keyof typeof styles] || styles.pending
  }

  const getPaymentBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    }
    return styles[status as keyof typeof styles] || styles.pending
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy-800 mb-2">Registrations</h1>
          <p className="text-gray-600">Manage team registrations and approvals</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-wrap gap-3">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === status
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="text-center py-12">Loading registrations...</div>
        ) : registrations.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No registrations found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reg. No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leader</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Module</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {reg.registration_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reg.team_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{reg.team_leader_name}</div>
                      <div className="text-xs text-gray-500">{reg.team_leader_email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{reg.primary_module}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reg.team_size}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentBadge(reg.payment_status)}`}>
                        {reg.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(reg.status)}`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => {
                          setSelectedReg(reg)
                          setShowModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedReg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedReg.team_name}</h2>
                  <p className="text-blue-100">{selectedReg.registration_number}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Team Information */}
              <div>
                <h3 className="text-lg font-bold text-navy-800 mb-4">Team Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Team Leader</label>
                    <div className="font-medium">{selectedReg.team_leader_name}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <div className="font-medium">{selectedReg.team_leader_email}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <div className="font-medium">{selectedReg.team_leader_phone}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Institution</label>
                    <div className="font-medium">{selectedReg.institution}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Primary Module</label>
                    <div className="font-medium">{selectedReg.primary_module}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Team Size</label>
                    <div className="font-medium">{selectedReg.team_size}</div>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h3 className="text-lg font-bold text-navy-800 mb-4">Team Members</h3>
                <div className="space-y-2">
                  {selectedReg.team_members && selectedReg.team_members.length > 0 ? (
                    selectedReg.team_members.map((member: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.email} • {member.role}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No additional members</p>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-bold text-navy-800 mb-4">Payment Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Payment Status</label>
                    <div>
                      <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getPaymentBadge(selectedReg.payment_status)}`}>
                        {selectedReg.payment_status}
                      </span>
                    </div>
                  </div>
                  {selectedReg.payment_proof_url && (
                    <div>
                      <label className="text-sm text-gray-600">Payment Proof</label>
                      <div>
                        <a
                          href={selectedReg.payment_proof_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View Payment Proof →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Certificate Info */}
              {selectedReg.certificate_id && (
                <div>
                  <h3 className="text-lg font-bold text-navy-800 mb-4">Certificate Information</h3>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-medium text-green-800">Certificate ID: {selectedReg.certificate_id}</div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-navy-800 mb-4">Actions</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedReg.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(selectedReg.id)}
                        disabled={actionLoading}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50"
                      >
                        {actionLoading ? 'Processing...' : '✓ Approve'}
                      </button>
                      <button
                        onClick={() => handleReject(selectedReg.id)}
                        disabled={actionLoading}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50"
                      >
                        {actionLoading ? 'Processing...' : '✗ Reject'}
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(selectedReg.id)}
                    disabled={actionLoading}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium disabled:opacity-50"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
