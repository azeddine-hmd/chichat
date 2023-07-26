import { RegisterDto } from './dto/register';
import { Error } from '../utils/error';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { prisma } from '../config/prisma';
import { sendVerificationMail } from '../utils/send-mail';
import { randomUUID } from 'crypto';

export async function registerUser(registerDto: RegisterDto) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(registerDto.password, salt);
  const birth = registerDto.dateOfBirth;
  try {
    const user = await prisma.user.create({
      data: {
        displayName: registerDto.displayName,
        username: registerDto.username,
        email: registerDto.email,
        password: hashedPassword,
        dateOfBirth: new Date(birth.year, birth.month, birth.day),
      },
    });
    delete user['password'];
    return user;
  } catch (err) {
    console.error(err);
    throw new Error(400, 'register failed');
  }
}

export async function sendEmailVerification(user: User) {
  const emailSecret = randomUUID();
  const verificationEmailHTML = `
  <h1>Email Verficiation</h1>
  <p>Click the link belwo to verify your email address:</p>
  <a href="${process.env.FRONTEND_DOMAIN}/auth/verify-email/${emailSecret}">Verify Email</a>
  `;

  try {
    sendVerificationMail(user.email, verificationEmailHTML);
    const code = await prisma.codes.create({
      data: {
        operation: 'EMAIL_VALIDATION',
        code: emailSecret,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    setTimeout(async () => {
      await prisma.codes.deleteMany({
        where: {
          id: code.id,
        },
      });
    }, 300_000);
  } catch (err) {
    console.error(err);
    throw new Error(500, 'failed to send verification mail');
  }
}
