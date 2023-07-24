import { NextFunction, Request, Response } from 'express';

export async function requestTimeMiddleware(
  req: any,
  res: Response,
  next: NextFunction
) {
  req.requestTime = Date.now();
  next();
}
