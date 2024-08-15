import { sendEmail } from './sendEmail.js';

export const sendParentRequestEmail = async ({
  name,
  email,
  type,
  kidName,
}) => {
  const message = `<div>
    <p>Hi ${name}</p>
    <p>${kidName} has ${type} your request</p>
    <p>For more information go to 
    <a href="http://localhost:3000/dashboard/my-profile">E-learning App</a
  </div>`;

  return sendEmail({
    to: email,
    subject: 'Request Information for kid',
    html: `<h4>Hello, ${name}</h4>
   ${message}
   `,
  });
};
