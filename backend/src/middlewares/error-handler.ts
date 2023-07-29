import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof PrismaClientKnownRequestError) {
    console.log(JSON.stringify(err.meta.target));
    res.status(400).send({ message: err.meta.target + ' already exist' });
  } else {
    console.error(err);
    next(err);
  }
}
