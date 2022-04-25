import { Application, Request, Response, Router } from 'express';
import { validateAdmin } from '../middleware/auth';
import loginsService from '../services/logins.service';
import { CommonRoutesConfig } from './common.routes.config';

export class LogRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, '/log');
  }

  configureRoutes(): Application {
    const router = Router();

    router.get(
      '/logins',
      validateAdmin,
      async (req: Request, res: Response) => {
        const logins = await loginsService.getAll();
        res.send(logins);
      }
    );

    this.app.use(this.getName(), router);
    return this.app;
  }
}
