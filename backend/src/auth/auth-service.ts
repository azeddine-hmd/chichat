import { RegisterDto } from './dto/register';
import { User } from '@prisma/client';
import { prisma } from '../config/prisma';
import { sendVerificationMail } from '../utils/send-mail';
import { randomUUID } from 'crypto';
import { HttpError } from '../utils/error';
import { comparePassword, hashPassword } from '../utils/password';
import { signJwt } from '../config';

export async function registerUser(registerDto: RegisterDto): Promise<User> {
  const hashedPassword = await hashPassword(registerDto.password);
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
  console.log(
    `email verification for user(${user.username}) is: ${emailSecret}`
  );
  const verificationEmailHTML = `
  <h1>Email Verficiation</h1>
  <p>Click the link belwo to verify your email address:</p>
  <a href="${process.env.FRONTEND_DOMAIN}/verify-email/${emailSecret}">Verify Email</a>
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
  // uncomment setTimeout below for limited verification time
  // setTimeout(async () => {
  // await prisma.codes.deleteMany({
  //   where: {
  //     id: code.id,
  //   },
  // });
  // }, 1_000_000);
}

export async function verifyEmail(
  code: string,
  sessionId: string
): Promise<User> {
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
  await prisma.codes.delete({
    where: { id: storedCode.id },
  });
  return storedCode.user;
}

export async function login(email: string, password?: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      password: true,
      username: true,
    },
  });
  if (!user || (password && !comparePassword(password, user.password)))
    throw new HttpError(400, 'The email or password you entered is incorrect');
  return await signJwt(user.id);
}
