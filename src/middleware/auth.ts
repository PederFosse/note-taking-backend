import { forbidden } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

export function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.path == '/peder-auth/login') return next();

  if (req.session.user) {
    return next();
  }

  throw forbidden();
}
