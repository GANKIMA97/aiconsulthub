import nodemailer from 'nodemailer';

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailNotificationOptions {
  subject: string;
  text: string;
  html?: string;
}

export async function sendNotification(options: EmailNotificationOptions) {
  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (!adminEmail) {
    throw new Error('Admin email not configured');
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: adminEmail,
      subject: options.subject,
      text: options.text,
      html: options.html || options.text,
    });
    
    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Failed to send email notification:', error);
    throw error;
  }
}

export async function sendChatNotification(message: string, sender?: string) {
  const subject = 'New Chat Message Received';
  const text = `
    New message received from ${sender || 'Anonymous'}:
    
    ${message}
    
    Time: ${new Date().toLocaleString()}
  `;
  
  const html = `
    <h2>New Chat Message Received</h2>
    <p><strong>From:</strong> ${sender || 'Anonymous'}</p>
    <p><strong>Message:</strong></p>
    <p style="padding: 10px; background-color: #f5f5f5; border-radius: 4px;">${message}</p>
    <p><small>Time: ${new Date().toLocaleString()}</small></p>
  `;

  await sendNotification({ subject, text, html });
}
