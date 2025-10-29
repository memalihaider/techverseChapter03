'use client'
import { useState } from 'react'
import { RegistrationData } from './page'

interface PaymentDetailsProps {
  data: RegistrationData
  updateData: (data: Partial<RegistrationData>) => void
  onPrev: () => void
  onSubmit: () => void
}

const paymentMethods = [
  { id: 'jazzcash', name: 'JazzCash', number: '03XX-XXXXXXX' },
  { id: 'easypaisa', name: 'EasyPaisa', number: '03XX-XXXXXXX' },
  { id: 'bank', name: 'Bank Transfer', number: 'Account: XXXX-XXXX-XXXX' }
]

export default function PaymentDetails({ data, updateData, onPrev, onSubmit }: PaymentDetailsProps) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const selectedModule = data.selectedModule
  if (!selectedModule) return null

  const totalFee = selectedModule.entryFee

  const validatePayment = () => {
    const newErrors: {[key: string]: string} = {}

    if (totalFee > 0) {
      if (!data.paymentMethod) newErrors.paymentMethod = 'Please select a payment method'
      if (!data.transactionId.trim()) newErrors.transactionId = 'Transaction ID is required'
      if (!data.paymentProof) newErrors.paymentProof = 'Payment proof is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      const maxSize = 5 * 1024 * 1024 // 5MB

      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, paymentProof: 'Please upload an image (JPG, PNG) or PDF file' })
        return
      }

      if (file.size > maxSize) {
        setErrors({ ...errors, paymentProof: 'File size must be less than 5MB' })
        return
      }

      updateData({ paymentProof: file })
      setErrors({ ...errors, paymentProof: '' })
    }
  }

  const handleSubmit = async () => {
    if (!validatePayment()) return

    setLoading(true)
    try {
      await onSubmit()
    } catch (error) {
      console.error('Payment submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Payment Details</h2>
        <p className="text-sm text-gray-600">
          Complete your registration by processing the payment for <strong>{selectedModule.name}</strong>.
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-md font-medium text-gray-900 mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Module: {selectedModule.name}</span>
            <span>₨{totalFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Team Size: {1 + data.teamMembers.length} member(s)</span>
            <span>-</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="text-indigo-600">
                {totalFee === 0 ? 'Free' : `₨${totalFee.toLocaleString()}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {totalFee > 0 ? (
        <>
          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method *
            </label>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center">
                  <input
                    id={method.id}
                    name="paymentMethod"
                    type="radio"
                    value={method.id}
                    checked={data.paymentMethod === method.id}
                    onChange={(e) => updateData({ paymentMethod: e.target.value })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor={method.id} className="ml-3 block text-sm text-gray-900">
                    <span className="font-medium">{method.name}</span>
                    <span className="text-gray-500 ml-2">{method.number}</span>
                  </label>
                </div>
              ))}
            </div>
            {errors.paymentMethod && <p className="mt-1 text-sm text-red-600">{errors.paymentMethod}</p>}
          </div>

          {/* Payment Instructions */}
          {data.paymentMethod && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Payment Instructions</h4>
              <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                <li>Send ₨{totalFee.toLocaleString()} to the selected payment method</li>
                <li>Note the transaction ID from your payment confirmation</li>
                <li>Upload a screenshot or receipt as proof of payment</li>
                <li>Enter the transaction ID in the field below</li>
              </ol>
            </div>
          )}

          {/* Transaction ID */}
          <div>
            <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">
              Transaction ID *
            </label>
            <input
              type="text"
              id="transactionId"
              value={data.transactionId}
              onChange={(e) => updateData({ transactionId: e.target.value })}
              placeholder="Enter transaction ID from payment confirmation"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.transactionId ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.transactionId && <p className="mt-1 text-sm text-red-600">{errors.transactionId}</p>}
          </div>

          {/* Payment Proof Upload */}
          <div>
            <label htmlFor="paymentProof" className="block text-sm font-medium text-gray-700">
              Payment Proof *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="paymentProof" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Upload payment proof</span>
                    <input
                      id="paymentProof"
                      name="paymentProof"
                      type="file"
                      className="sr-only"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
                {data.paymentProof && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {data.paymentProof.name} uploaded
                  </p>
                )}
              </div>
            </div>
            {errors.paymentProof && <p className="mt-1 text-sm text-red-600">{errors.paymentProof}</p>}
          </div>
        </>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">No Payment Required</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>This module is free to participate in. You can proceed to complete your registration.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-700">
              I agree to the <a href="/rules" className="text-indigo-600 hover:text-indigo-500">terms and conditions</a> and 
              understand that registration fees are non-refundable.
            </label>
          </div>
        </div>
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
          onClick={handleSubmit}
          disabled={loading}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Complete Registration'}
        </button>
      </div>
    </div>
  )
}