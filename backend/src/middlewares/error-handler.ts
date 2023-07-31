import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { HttpError } from '../utils/error';

export function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof PrismaClientKnownRequestError) {
    console.log(JSON.stringify(err.meta.target));
    res.status(400).send({ message: err.meta.target + ' already exist' });
  } else if (err instanceof HttpError) {
    const { status, ...rest } = err;
    res.status(status).send(rest);
  } else {
    console.error(err);
    next(err);
  }
}
