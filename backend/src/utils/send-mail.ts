// import { mg } from '../config';
import nodemailer from 'nodemailer';

export async function sendVerificationMail(to: string, htmlContent: string) {
  // return await mg.messages.create(
  //   'sandboxebcb4c88e0454f0181e28e38dda7e503.mailgun.org',
  //   {
  //     from: 'Discord  <mailgun@sandboxebcb4c88e0454f0181e28e38dda7e503.mailgun.org>',
  //     to: [to],
  //     subject: 'Email Validation',
  //     text: 'Testing some Mailgun awesomeness!',
  //     html: htmlContent,
  //   }
  // );
  
  // send via nodemail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'azeddine.hmd@gmail.com',
      pass: 'InnocentDevil_666',
    },
    secure: true,
    authMethod: 'PLAIN',
  })

  await transporter.sendMail({
      from: 'Azeddine Hamdaoui  <smtp.gmail.com>',
      to: [to],
      subject: 'Email Validation',
      text: 'This is just for development application!',
      html: htmlContent,
  })
}
