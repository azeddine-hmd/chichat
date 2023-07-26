import { Router } from 'express';
import * as authController from './auth-controller';

const prefix = '/auth';

export const authRouter = Router();

authRouter.post(prefix + '/register', authController.register);
