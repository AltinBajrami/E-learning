import { sendEmail } from './sendEmail.js';

export const sendGradeEmail = async ({ name, email, grade }) => {
  const message = `<div>
    <p>Hi ${name}</p>
    <p>Your grade has been added successfully.</p>
    <p>Your current grade is: ${grade}</p>
    <p>For more information about the grade go to 
    <a href="http://localhost:3000/dashboard/my-profile">E-learning App</a
  </div>`;

  return sendEmail({
    to: email,
    subject: 'Grade Email',
    html: `<h4>Hello, ${name}</h4>
   ${message}
   `,
  });
};
