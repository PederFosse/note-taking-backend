import { Router } from 'express';

const { qaController } = require('../controllers');

const router = Router();

router.get('/questions', qaController.getAllQuestions);

router.get('/questions/:id', qaController.getOneQuestion);

router.put('/questions/:id', qaController.updateQuestion);

router.post('/questions', qaController.createQuestion);

router.delete('/questions/:id', qaController.destroyQuestion);

router.get('/questions/:id/answers', qaController.getAnswersToQuestion);

router.get('/answers/:id', qaController.getOneAnswer);

router.put('/answers/:id', qaController.updateAnswer);

router.post('/questions/:id/answer', qaController.createAnswer);

router.delete('/answers/:id', qaController.destroyAnswer);

module.exports = router;
