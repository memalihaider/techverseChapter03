'use client'
import React from 'react'
import { jsPDF } from 'jspdf'

export default function CertificateGenerator() {
  function handleGenerate() {
    const doc = new jsPDF({ orientation: 'landscape' })
    doc.setFontSize(24)
    doc.text('Techverse 2026 Certificate', 20, 30)
    doc.setFontSize(16)
    doc.text('This certifies that John Doe participated in Speed Programming.', 20, 60)
    doc.save('certificate-techverse.pdf')
  }

  return (
    <div>
      <button onClick={handleGenerate} className="px-4 py-2 bg-blue-600 text-white rounded">Generate sample certificate</button>
    </div>
  )
}
