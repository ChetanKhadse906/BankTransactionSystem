import nodemailer from 'nodemailer';
import dns from 'node:dns/promises';
import config from '../config/config.js';

let smtpHost = 'smtp.gmail.com';
try {
  const { address } = await dns.lookup('smtp.gmail.com', { family: 4 });
  smtpHost = address;
  console.log('Resolved smtp.gmail.com to', address);
} catch (err) {
  console.error('DNS lookup failed, falling back to hostname:', err.message);
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: 465,
  secure: true,
  tls: { servername: 'smtp.gmail.com' }, // needed so the TLS cert still matches
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 30000,
  auth: {
    type: 'OAuth2',
    user: config.EMAIL_USER,
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    refreshToken: config.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"BankTransactionSystem" <${config.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // let the caller decide what to do
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = 'Welcome to Backend Ledger!';
  const text = `Hello ${name},\n\nThank you for registering at Backend Ledger. We're excited to have you on board!\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hello ${name},</p><p>Thank you for registering at Backend Ledger. We're excited to have you on board!</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

export default { sendRegistrationEmail };