import { sendEmail } from './sendEmail.js';

export const sendReminderEmail = async ({ name, email, senderName }) => {
  const message = `<div>
    <p>Hi ${name}</p>
    <p>Your have a new unread message from ${senderName}.</p>
    <p>For more information about the messages click the link below.</p> 
    <a href="http://localhost:3000/dashboard/dashboard/chat">E-learning App</a
  </div>`;

  return sendEmail({
    to: email,
    subject: 'Unread Message Reminder',
    html: `<h4>Hello, ${name}</h4>
   ${message}
   `,
  });
};
