import { NextFunction, Request, Response } from 'express';
import PederAuthService from '../services/peder-auth.service';
import { hashSync, genSaltSync, compareSync, hash, compare } from 'bcryptjs';
import { User } from '../types';

class PederAuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, password } = req.body;

    try {
      const user = await PederAuthService.getUser(username);

      const loginSuccess = await compare(password, user.password);

      const userObj: User = { id: user.id, scope: user.scope };

      if (loginSuccess) {
        // @ts-ignore
        req.session.user = userObj;
      }

      res.send({ success: loginSuccess, session: req.session });
    } catch (err) {
      next(err);
    }
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password } = req.body;

    const hashedPwd = await hash(password, 10);

    try {
      const user = await PederAuthService.createUser(username, hashedPwd);
      res.send(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new PederAuthController();
