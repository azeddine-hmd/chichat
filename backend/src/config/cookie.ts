import { CookieOptions } from 'express';
import { COOKIE_MAX_AGE_MILIS } from '../constants';

export const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production' ? true : false,
  sameSite: 'lax',
  maxAge: COOKIE_MAX_AGE_MILIS,
};
