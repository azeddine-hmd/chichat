import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  host: process.env.NODEMAILER_HOST,
  port: parseInt(process.env.NODEMAILER_PORT),
  secure: true,
  auth: {
    type: 'login',
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_APP_PASSWORD,
  },
});

export async function sendVerificationMail(to: string, htmlContent: string) {
  await transporter.sendMail({
    from: `${process.env.NODEMAILER_FROM}  <${process.env.NODEMAILER_EMAIL}>`,
    to: [to],
    subject: 'Email Validation',
    text: 'This is just for development application!',
    html: htmlContent,
  });
}
