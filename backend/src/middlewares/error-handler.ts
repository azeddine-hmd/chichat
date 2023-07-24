import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Error } from '../utils/error';

export function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Error) {
    res.status(400).send({ error: err.message });
  } else {
    next(err);
  }
}
