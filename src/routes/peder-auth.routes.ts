import { Application, Request, Response, Router } from 'express';
import { CommonRoutesConfig } from './common.routes.config';

import authController from '../controllers/peder-auth.controller';
import { validateAdmin } from '../middleware/auth';
import defaultDataController from '../controllers/default-data.controller';

export class PederAuth extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, '/peder-auth');
  }

  configureRoutes(): Application {
    const router = Router();

    router.post('/login', authController.login.bind(authController));

    router.post('/user', authController.createUser.bind(authController), defaultDataController.insertDefaultData.bind(defaultDataController));

    router.put('/user/:id', validateAdmin, authController.updateUser.bind(authController));

    router.post('/logout', authController.logout.bind(authController));

    router.get('/session', (req: Request, res: Response) => {
      res.send(req.session);
    });

    this.app.use(this.getName(), router);
    return this.app;
  }
}
