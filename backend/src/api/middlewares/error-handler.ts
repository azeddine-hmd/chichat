import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { HttpError } from '../../utils/error';

export function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.meta?.target) {
      console.error(err);
      res.status(400).send({ message: err.meta.target + ' already exist' });
    } else {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  } else if (err instanceof HttpError) {
    const { status, ...rest } = err;
    res.status(status).send(rest);
  } else {
    console.error(err);
    next(err);
  }
}
