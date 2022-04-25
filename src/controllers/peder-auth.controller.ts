import { NextFunction, Request, Response } from 'express';
import PederAuthService from '../services/peder-auth.service';
import { hash, compare } from 'bcryptjs';
import { SessionUser, UserInput, UserScopeEnum } from '../types';
import { forbidden } from '@hapi/boom';
import loginsService from '../services/logins.service';

function isAdmin(user: SessionUser): boolean {
  return user.scope.includes(UserScopeEnum.ADMIN);
}

async function hashPass(clearTextPassword: string): Promise<string> {
  return await hash(clearTextPassword, 10);
}

class PederAuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, password } = req.body;

    try {
      const user = await PederAuthService.getUser(username);

      const loginSuccess = await compare(password, user.password);

      if (loginSuccess) {
        req.session.userId = user.id;
        await loginsService.create(user.id);
      }

      res.send({ success: loginSuccess, session: req.session });
    } catch (err) {
      next(err);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // already validated in middleware
    const user = req.user as SessionUser;

    const userId = req.params.id;

    const { username, password } = req.body;

    const toUpdate: Partial<UserInput> = {
      username,
    };

    if (password) {
      const hashedPassword = await hashPass(password);
      toUpdate.password = hashedPassword;
    }

    if (req.body.scope) {
      if (isAdmin(user)) {
        toUpdate.scope = req.body.scope;
      } else {
        throw forbidden();
      }
    }

    try {
      const updated = await PederAuthService.updateUser(userId, toUpdate);
      res.send(updated);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    req.session.destroy(() => {
      res.send({ success: true });
    });
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password } = req.body;
    console.log('creating user');

    const hashedPassword = await hashPass(password);

    const user: UserInput = {
      username,
      password: hashedPassword,
    };

    if (username === 'sysadmin') {
      user.scope = [UserScopeEnum.ADMIN];
    }

    try {
      const created = await PederAuthService.createUser(user);
      res.send(created);
    } catch (err) {
      next(err);
    }
  }
}

export default new PederAuthController();
