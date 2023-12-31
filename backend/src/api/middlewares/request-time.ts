import { NextFunction, Request, Response } from 'express';

export async function requestTimeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.requestTime = new Date();
  next();
}
