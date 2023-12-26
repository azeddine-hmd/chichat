import { CodeOperation, User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { comparePassword, hashPassword } from '../../utils/password';
import { prisma, signJwt } from '../../config';
import { sendVerificationMail } from '../../utils/send-mail';
import { HttpError } from '../../utils/error';
import { RegisterDto } from './types/dto/register-dto';

export async function registerUser(registerDto: RegisterDto): Promise<User> {
  const hashedPassword = await hashPassword(registerDto.password);
  const birth = registerDto.dateOfBirth;
  const oldUser = await prisma.user.findFirst({
    where: { username: registerDto.username },
  });
  if (oldUser && !oldUser.active)
    await prisma.user.delete({ where: { id: oldUser.id } });
  const user = await prisma.user.create({
    data: {
      displayName: registerDto.displayName,
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
      dateOfBirth: new Date(birth.year, birth.month, birth.day),
    },
  });
  return user;
}

export async function getUser(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: { email: email },
  });
  if (!(await comparePassword(password, user.password)))
    throw new HttpError(400, 'no such user with email and password');
  return user;
}

export async function sendEmailVerification(user: User) {
  if (process.env.NODE_ENV === 'test') return;
  const emailSecret = randomUUID();
  const verificationEmailHTML = `
  <h1>Email Verficiation</h1>
  <p>Click the link belwo to verify your email address:</p>
  <a href="${process.env.FRONTEND_DOMAIN}/verify-email/${emailSecret}">Verify Email</a>
  `;
  sendVerificationMail(user.email, verificationEmailHTML);
  const code = await prisma.codes.create({
    data: {
      operation: CodeOperation.EMAIL_VALIDATION,
      code: emailSecret,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
}

export async function verifyEmail(code: string): Promise<User> {
  // verify code
  const storedCodes = await prisma.codes.findMany({
    where: {
      code: code,
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

export async function login(email: string, password?: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      password: true,
      username: true,
      active: true,
      avatar: true,
    },
  });
  if (!user || (password && !comparePassword(password, user.password)))
    throw new HttpError(400, 'The email or password you entered is incorrect');
  if (!user.active)
    throw new HttpError(
      400,
      'User is not active yet, please check your mail inbox'
    );
  return {
    user: {
      id: user.id,
      username: user.username,
    },
    token: signJwt(user.id),
  };
}
