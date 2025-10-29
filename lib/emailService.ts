import { supabaseAdmin } from './adminAuth'

export interface EmailTemplate {
  subject: string
  body: string
}

export async function sendEmail(
  to: string,
  subject: string,
  htmlBody: string,
  registrationId?: string,
  emailType?: string
): Promise<boolean> {
  try {
    // Log email (in production, integrate with actual email service like SendGrid, AWS SES, etc.)
    await supabaseAdmin.from('email_logs').insert({
      registration_id: registrationId,
      email_type: emailType || 'general',
      recipient_email: to,
      subject,
      body: htmlBody,
      status: 'sent',
      sent_at: new Date().toISOString()
    })

    // TODO: Integrate with actual email service
    console.log(`Email would be sent to ${to}: ${subject}`)
    
    return true
  } catch (error) {
    console.error('Email send error:', error)
    
    // Log failed email
    try {
      await supabaseAdmin.from('email_logs').insert({
        registration_id: registrationId,
        email_type: emailType || 'general',
        recipient_email: to,
        subject,
        body: htmlBody,
        status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error'
      })
    } catch (logError) {
      console.error('Email log error:', logError)
    }
    
    return false
  }
}

export function getApprovalEmailTemplate(
  teamName: string,
  teamLeaderName: string,
  registrationNumber: string,
  certificateId: string
): EmailTemplate {
  return {
    subject: `🎉 Registration Approved - Techverse 2026`,
    body: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; color: #666; padding: 20px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Congratulations!</h1>
      <p>Your registration has been approved</p>
    </div>
    <div class="content">
      <p>Dear <strong>${teamLeaderName}</strong>,</p>
      
      <p>We are thrilled to inform you that your team "<strong>${teamName}</strong>" has been successfully approved for Techverse 2026!</p>
      
      <div class="details">
        <h3>Registration Details</h3>
        <div class="detail-row">
          <span><strong>Registration Number:</strong></span>
          <span>${registrationNumber}</span>
        </div>
        <div class="detail-row">
          <span><strong>Certificate ID:</strong></span>
          <span>${certificateId}</span>
        </div>
        <div class="detail-row">
          <span><strong>Team Name:</strong></span>
          <span>${teamName}</span>
        </div>
      </div>
      
      <h3>Next Steps:</h3>
      <ol>
        <li>Save your registration number and certificate ID for future reference</li>
        <li>Check your email regularly for event updates and schedules</li>
        <li>Prepare your team for an amazing competition experience</li>
        <li>Join our Discord/WhatsApp group (link will be sent separately)</li>
      </ol>
      
      <div style="text-align: center;">
        <a href="https://techverse2026.com/dashboard" class="button">View Your Dashboard</a>
      </div>
      
      <p>If you have any questions, feel free to reach out to us at <a href="mailto:support@techverse2026.com">support@techverse2026.com</a></p>
      
      <p>See you at Techverse 2026!</p>
      
      <p>Best regards,<br><strong>Techverse 2026 Team</strong></p>
    </div>
    <div class="footer">
      <p>© 2026 Techverse. All rights reserved.</p>
      <p>This is an automated email. Please do not reply directly to this message.</p>
    </div>
  </div>
</body>
</html>
    `
  }
}

export function getRejectionEmailTemplate(
  teamName: string,
  teamLeaderName: string,
  registrationNumber: string,
  reason: string
): EmailTemplate {
  return {
    subject: `Registration Status - Techverse 2026`,
    body: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
    .reason-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; color: #666; padding: 20px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Registration Update</h1>
      <p>Regarding your Techverse 2026 application</p>
    </div>
    <div class="content">
      <p>Dear <strong>${teamLeaderName}</strong>,</p>
      
      <p>Thank you for your interest in Techverse 2026 and for taking the time to submit your application for team "<strong>${teamName}</strong>".</p>
      
      <div class="details">
        <h3>Registration Information</h3>
        <p><strong>Registration Number:</strong> ${registrationNumber}</p>
        <p><strong>Team Name:</strong> ${teamName}</p>
      </div>
      
      <div class="reason-box">
        <h3>Status Update</h3>
        <p>After careful review, we regret to inform you that your registration could not be approved at this time.</p>
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
      </div>
      
      <h3>What You Can Do:</h3>
      <ul>
        <li>Review the registration requirements and reapply if eligible</li>
        <li>Contact us for clarification at <a href="mailto:support@techverse2026.com">support@techverse2026.com</a></li>
        <li>Join our community events and workshops throughout the year</li>
        <li>Stay connected for future Techverse events</li>
      </ul>
      
      <p>We encourage you to continue developing your skills and hope to see you participate in future events!</p>
      
      <div style="text-align: center;">
        <a href="https://techverse2026.com/contact" class="button">Contact Support</a>
      </div>
      
      <p>Best regards,<br><strong>Techverse 2026 Team</strong></p>
    </div>
    <div class="footer">
      <p>© 2026 Techverse. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  }
}

export function getConfirmationEmailTemplate(
  teamName: string,
  teamLeaderName: string,
  registrationNumber: string
): EmailTemplate {
  return {
    subject: `Registration Received - Techverse 2026`,
    body: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; color: #666; padding: 20px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Registration Received!</h1>
      <p>Thank you for registering</p>
    </div>
    <div class="content">
      <p>Dear <strong>${teamLeaderName}</strong>,</p>
      
      <p>We have successfully received your registration for Techverse 2026!</p>
      
      <div class="details">
        <h3>Registration Details</h3>
        <p><strong>Registration Number:</strong> ${registrationNumber}</p>
        <p><strong>Team Name:</strong> ${teamName}</p>
        <p><strong>Status:</strong> Under Review</p>
      </div>
      
      <h3>What Happens Next?</h3>
      <ol>
        <li>Our team will review your registration within 2-3 business days</li>
        <li>We will verify your payment proof and team details</li>
        <li>You will receive an approval/update email shortly</li>
        <li>Keep your registration number safe for future reference</li>
      </ol>
      
      <p>If you have any questions or need to update your information, please contact us at <a href="mailto:support@techverse2026.com">support@techverse2026.com</a> with your registration number.</p>
      
      <p>Thank you for your interest in Techverse 2026!</p>
      
      <p>Best regards,<br><strong>Techverse 2026 Team</strong></p>
    </div>
    <div class="footer">
      <p>© 2026 Techverse. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  }
}
