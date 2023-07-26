import { mg } from '../config';

export async function sendVerificationMail(to: string, htmlContent: string) {
  return await mg.messages.create(
    'sandboxebcb4c88e0454f0181e28e38dda7e503.mailgun.org',
    {
      from: 'Discord  <mailgun@sandboxebcb4c88e0454f0181e28e38dda7e503.mailgun.org>',
      to: [to],
      subject: 'Email Validation',
      text: 'Testing some Mailgun awesomeness!',
      html: htmlContent,
    }
  );
}
