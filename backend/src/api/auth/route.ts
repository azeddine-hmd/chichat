import { Router } from 'express';
import * as authController from './auth-controller';
import { upload } from '../../config';
import { authenticated } from '../middlewares/authenticated';

const prefix = '/auth';

export const authRouter = Router();

/**
 * @openapi
 * /api/auth/pass:
 *   get:
 *     summary: Check user authentication status
 *     tags:
 *     - Authentication
 *     responses:
 *       204:
 *         description: Authenticated
 *       400:
 *         description: Not Authenticated
 */
authRouter.get(prefix + '/pass', authenticated, (req, res) =>
  res.status(204).send()
);

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Register'
 *     responses:
 *       204:
 *         description: user created successfully
 *       400:
 *          description: Failed to register
 */
authRouter.post(prefix + '/register', authController.register);

/**
 * @openapi
 * /api/auth/upload/avatar:
 *    post:
 *      summary: Upload avatar for already registered user
 *      tags:
 *        - Authentication
 *      consumes:
 *        - multipart/form-data
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                avatar:
 *                  type: string
 *                  format: binary
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 */
authRouter.post(
  prefix + '/upload/avatar',
  upload.fields([
    {
      name: 'email',
    },
    {
      name: 'password',
    },
    {
      name: 'avatar',
    },
  ]),
  authController.uploadAvatar
);

authRouter.post(prefix + '/email-verify', authController.verifyEmail);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Login'
 *     responses:
 *       '204':
 *         description: login, session cookie set up successfully
 *       '400':
 *         description: wrong credentials
 */
authRouter.post(prefix + '/login', authController.login);
