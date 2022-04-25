import { Application, Router } from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import QAController from '../controllers/qa.controller';

export class QARoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, '/qa');
  }

  configureRoutes(): Application {
    const router = Router();

    router.get('/questions', QAController.getAllQuestions.bind(QAController));

    router.get('/questions/:id', QAController.getOneQuestion.bind(QAController));

    router.put('/questions/:id', QAController.updateQuestion.bind(QAController));

    router.post('/questions', QAController.createQuestion.bind(QAController));

    router.delete('/questions/:id', QAController.destroyQuestion.bind(QAController));

    router.get('/questions/:id/answers', QAController.getAnswersToQuestion.bind(QAController));

    router.get('/answers/:id', QAController.getOneAnswer.bind(QAController));

    router.put('/answers/:id', QAController.updateAnswer.bind(QAController));

    router.post('/questions/:id/answer', QAController.createAnswer.bind(QAController));

    router.delete('/answers/:id', QAController.destroyAnswer.bind(QAController));

    this.app.use(this.getName(), router);
    return this.app;
  }
}
