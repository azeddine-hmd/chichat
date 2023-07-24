import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { RegisterDto } from './dto/register';
import { validate } from 'class-validator';
import * as authService from './auth-service';

export async function register(req: Request, res: Response) {
  const registerDto = plainToClass(RegisterDto, req.body);
  const validationError = await validate(registerDto);
  if (validationError.length > 0) {
    return res.status(400).json(validationError);
  }
  const user = await authService.registerUser(registerDto);
  if (user) res.send(user);
}
