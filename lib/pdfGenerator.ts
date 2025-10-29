import jsPDF from 'jspdf'

export function generateCertificatePdf({ name, event, date, verificationCode }: { name: string, event: string, date: string, verificationCode: string }) {
  const doc = new jsPDF({ orientation: 'landscape' })
  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(22)
  doc.text('Techverse 2026', 20, 30)
  doc.setFontSize(16)
  doc.text(`This is to certify that ${name}`, 20, 60)
  doc.text(`has participated in ${event} on ${date}.`, 20, 80)
  doc.setFontSize(10)
  doc.text(`Verification Code: ${verificationCode}`, 20, 140)
  return doc.output('blob')
}
