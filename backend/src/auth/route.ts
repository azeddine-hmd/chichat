import { Router } from 'express';
import * as authController from './auth-controller';

export const authRouter = Router();

authRouter.post('/auth/register', authController.register);
