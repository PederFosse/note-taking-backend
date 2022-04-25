import { Application, Router } from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import FlashcardsController from '../controllers/flashcards.controller';

export class FlashCardsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, '/flashcards');
  }

  configureRoutes(): Application {
    const router = Router();

    router.get('/', FlashcardsController.getAll.bind(FlashcardsController));

    router.post('/', FlashcardsController.create.bind(FlashcardsController));

    router.get('/:id', FlashcardsController.getOne.bind(FlashcardsController));

    router.put('/:id', FlashcardsController.update.bind(FlashcardsController));

    router.delete('/:id', FlashcardsController.destroy.bind(FlashcardsController));

    this.app.use(this.getName(), router);
    return this.app;
  }
}
