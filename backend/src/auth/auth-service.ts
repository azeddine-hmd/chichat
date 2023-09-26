import { RegisterDto } from './dto/register';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { prisma } from '../config/prisma';
import { sendVerificationMail } from '../utils/send-mail';
import { randomUUID } from 'crypto';
import { HttpError } from '../utils/error';

export async function registerUser(registerDto: RegisterDto): Promise<User> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(registerDto.password, salt);
  const birth = registerDto.dateOfBirth;
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
}

export async function sendEmailVerification(user: User, sessionId: string) {
  const emailSecret = randomUUID();
  const verificationEmailHTML = `
  <h1>Email Verficiation</h1>
  <p>Click the link belwo to verify your email address:</p>
  <a href="${process.env.FRONTEND_DOMAIN}/auth/verify-email/${emailSecret}">Verify Email</a>
  `;

  sendVerificationMail(user.email, verificationEmailHTML);
  const code = await prisma.codes.create({
    data: {
      operation: 'EMAIL_VALIDATION',
      code: emailSecret,
      sessionId: sessionId,
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
  }, 1_000_000);
}

export async function verifyEmail(code: string, sessionId: string) {
  // verify code
  const storedCodes = await prisma.codes.findMany({
    where: {
      code: code,
      sessionId: sessionId,
    },
    include: {
      user: true,
    },
  });
  if (storedCodes.length != 1 || storedCodes[0].code !== code)
    throw new HttpError(400, 'Failed to verify email');

  // activate account
  const storedCode = storedCodes[0];
  await prisma.user.update({
    where: {
      id: storedCode.user.id,
    },
    data: {
      active: true,
    },
  });
}
