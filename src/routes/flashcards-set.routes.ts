import { Application, Router } from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import FlashcardsSetController from '../controllers/flashcards-set.controller';

export class FlashcardsSetRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, '/flashcardsSet');
  }

  configureRoutes(): Application {
    const router = Router();

    router.get('/', FlashcardsSetController.getAll.bind(FlashcardsSetController));

    router.post('/', FlashcardsSetController.create.bind(FlashcardsSetController));

    router.get('/:id', FlashcardsSetController.getOne.bind(FlashcardsSetController));

    router.put('/:id', FlashcardsSetController.update.bind(FlashcardsSetController));

    router.delete('/:id', FlashcardsSetController.destroy.bind(FlashcardsSetController));

    this.app.use(this.getName(), router);
    return this.app;
  }
}
