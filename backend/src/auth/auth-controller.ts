import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { RegisterDto } from './dto/register';
import { validate } from 'class-validator';
import * as authService from './auth-service';
import { VerifyEmailDto } from './dto/verify-email';
import { HttpError } from '../utils/error';

export async function register(req: Request, res: Response) {
  const registerDto = plainToClass(RegisterDto, req.body);
  const validationError = await validate(registerDto);
  if (validationError.length > 0)
    return res.status(400).json(validationError);
  const user = await authService.registerUser(registerDto);
  await authService.sendEmailVerification(user, req.sessionID);
  res.send(user);
}

export async function verifyEmail(req: Request, res: Response) {
  const verifyEmailDto = plainToClass(VerifyEmailDto, req.body);
  const validationError = await validate(verifyEmailDto);
  if (validationError.length > 0)
    return res.status(400).json(validationError);
  await authService.verifyEmail(verifyEmailDto.code, req.sessionID);

  // login
  // await authService.login();

  res.status(200).send();
}

export async function pass(req: Request, res: Response) {
  throw new HttpError(522, 'Not Implemented');
}

export async function login(req: Request, res: Response) {
  throw new HttpError(522, 'not Implemented');
}
