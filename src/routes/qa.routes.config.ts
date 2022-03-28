import { Application, Router } from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import QAController from '../controllers/qa.controller';

export class QARoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, '/qa');
  }

  configureRoutes(): Application {
    const router = Router();

    router.get('/questions', QAController.getAllQuestions);

    router.get('/questions/:id', QAController.getOneQuestion);

    router.put('/questions/:id', QAController.updateQuestion);

    router.post('/questions', QAController.createQuestion);

    router.delete('/questions/:id', QAController.destroyQuestion);

    router.get('/questions/:id/answers', QAController.getAnswersToQuestion);

    router.get('/answers/:id', QAController.getOneAnswer);

    router.put('/answers/:id', QAController.updateAnswer);

    router.post('/questions/:id/answer', QAController.createAnswer);

    router.delete('/answers/:id', QAController.destroyAnswer);

    this.app.use(this.getName(), router);
    return this.app;
  }
}
