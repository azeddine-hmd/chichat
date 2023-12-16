import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { RegisterDto } from './dto/register-dto';
import { validate } from 'class-validator';
import * as authService from './auth-service';
import { VerifyEmailDto } from './dto/verify-email';
import { LoginDto } from './dto/login-dto';
import { defaultCookieOptions } from '../../config';
import * as profileService from '../users/services/profile-service';

export async function register(req: Request, res: Response) {
  const registerDto = plainToClass(RegisterDto, req.body);
  const validationError = await validate(registerDto);
  if (validationError.length > 0) return res.status(400).json(validationError);
  await authService.registerUser(registerDto);
  res.status(204).send();
}

export async function uploadAvatar(req: Request, res: Response) {
  const user = await authService.getUser(req.body.email, req.body.password);
  await profileService.uploadAvatar(user, req.files['avatar'][0]);
  await authService.sendEmailVerification(user);
  res.status(204).send();
}

export async function login(req: Request, res: Response) {
  const loginDto = plainToClass(LoginDto, req.body);
  const validationError = await validate(loginDto);
  if (validationError.length > 0) return res.status(400).json(validationError);
  const { token } = await authService.login(loginDto.email, loginDto.password);
  res.cookie(`${process.env.JWT_COOKIE_NAME}`, token, defaultCookieOptions);
  res.status(204).send();
}

export async function verifyEmail(req: Request, res: Response) {
  const verifyEmailDto = plainToClass(VerifyEmailDto, req.body);
  const validationError = await validate(verifyEmailDto);
  if (validationError.length > 0) return res.status(400).json(validationError);
  const user = await authService.verifyEmail(verifyEmailDto.code);
  const { token } = await authService.login(user.email);
  res.cookie(`${process.env.JWT_COOKIE_NAME}`, token, defaultCookieOptions);
  res.status(200).send();
}
