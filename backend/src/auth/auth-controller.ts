import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { RegisterDto } from './dto/register';
import { validate } from 'class-validator';
import * as authService from './auth-service';
import { VerifyEmailDto } from './dto/verify-email';
import { LoginDto } from './dto/login';
import { defaultCookieOptions } from '../config';

export async function register(req: Request, res: Response) {
  const registerDto = plainToClass(RegisterDto, req.body);
  const validationError = await validate(registerDto);
  if (validationError.length > 0) return res.status(400).json(validationError);
  const user = await authService.registerUser(registerDto);
  await authService.sendEmailVerification(user, req.sessionID);
  res.status(200).send(user);
}

export async function login(req: Request, res: Response) {
  const loginDto = plainToClass(LoginDto, req.body);
  const validationError = await validate(loginDto);
  if (validationError.length > 0) return res.status(400).json(validationError);
  const token = await authService.login(loginDto.email, loginDto.password);
  res.cookie('loginId', token, defaultCookieOptions);
  res.status(200).send();
}

export async function verifyEmail(req: Request, res: Response) {
  const verifyEmailDto = plainToClass(VerifyEmailDto, req.body);
  const validationError = await validate(verifyEmailDto);
  if (validationError.length > 0) return res.status(400).json(validationError);
  const user = await authService.verifyEmail(
    verifyEmailDto.code,
    req.sessionID
  );
  const token = await authService.login(user.email);
  res.cookie('loginId', token, defaultCookieOptions);
  res.status(200).send();
}
