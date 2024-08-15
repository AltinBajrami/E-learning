import { sendEmail } from './sendEmail.js';

export const sendTeacherEmailForClass = async ({ name, email, className }) => {
  const message = `<div>
    <p>Hi ${name}</p>
    <p>You have been made instructor of class ${className}</p>
    <p>For more information about the class go to 
    <a href="http://localhost:3000/dashboard/classes">E-learning App</a
  </div>`;

  return sendEmail({
    to: email,
    subject: 'Instructor Email',
    html: `<h4>Hello, ${name}</h4>
   ${message}
   `,
  });
};
