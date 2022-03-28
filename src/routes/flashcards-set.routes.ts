import { Application, Router } from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import FlashcardsSetController from '../controllers/flashcards-set.controller';

export class FlashcardsSetRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, '/flashcardsSet');
  }

  configureRoutes(): Application {
    const router = Router();

    router.get('/', FlashcardsSetController.getAll);

    router.post('/', FlashcardsSetController.create);

    router.put('/:id', FlashcardsSetController.update);

    router.delete('/:id', FlashcardsSetController.destroy);

    this.app.use(this.getName(), router);
    return this.app;
  }
}
