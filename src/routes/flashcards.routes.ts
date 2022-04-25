import { Application, Router } from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import FlashcardsController from '../controllers/flashcards.controller';

export class FlashCardsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, '/flashcards');
  }

  configureRoutes(): Application {
    const router = Router();

    router.get('/', FlashcardsController.getAll);

    router.post('/', FlashcardsController.create);

    router.get('/:id', FlashcardsController.getOne);

    router.put('/:id', FlashcardsController.update);

    router.delete('/:id', FlashcardsController.destroy);

    this.app.use(this.getName(), router);
    return this.app;
  }
}
