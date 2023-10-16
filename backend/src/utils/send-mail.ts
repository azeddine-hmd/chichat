import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'login',
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendVerificationMail(to: string, htmlContent: string) {
  await transporter.sendMail({
    from: 'Azeddine Hamdaoui  <azeddine.hmd@gmail.com>',
    to: [to],
    subject: 'Email Validation',
    text: 'This is just for development application!',
    html: htmlContent,
  });
}
