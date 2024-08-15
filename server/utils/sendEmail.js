import nodemailer from 'nodemailer';
import nodemailerConfig from './nodemailerConfig.js';

export const sendEmail = async ({ to, subject, html, attachments }) => {
  try {
    console.log('Setting up transporter...');
    const transporter = nodemailer.createTransport(nodemailerConfig);

    console.log('Sending email...');
    await transporter.sendMail({
      from: 'Starlabs-Internship', // sender address
      to,
      subject,
      html,
      attachments,
    });

    console.log('Email sent successfully to:', to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
