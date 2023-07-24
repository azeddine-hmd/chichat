import { RegisterDto } from './dto/register';
import { Error } from '../utils/error';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { prisma } from '../config/prisma';

export async function registerUser(
  registerDto: RegisterDto,
): Promise<User> {
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
