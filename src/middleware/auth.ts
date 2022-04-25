import { forbidden } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import pederAuthService from '../services/peder-auth.service';
import { UserScopeEnum } from '../types';

export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (
    req.path == '/peder-auth/login' ||
    (req.path == '/peder-auth/user' && req.method === 'POST')
  ) {
    return next();
  }

  if (!req.session.userId) {
    return next(forbidden());
  }

  const user = await pederAuthService.getUserById(req.session.userId);
  if (!user) {
    throw forbidden();
  }

  req.user = user;

  return next();
}

export function validateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.user?.scope.includes(UserScopeEnum.ADMIN)) {
    return next();
  }
  return next(forbidden());
}
