import { Request, Response, NextFunction } from 'express';
import { logger } from '../util/logger';
import { errors } from '../util';

interface HttpError extends Error {
  status: number;
  message: string;
  code?: number;
  keyValue?: any;
}

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === 'MongoError' && err.code === 11000 && err.keyValue?.email) {
    err.message = errors.emailAlreadyRegistered;
  }
  
  logger.info('error', err);
  res.status(err.status || 500).send({ message: err.message });
};
