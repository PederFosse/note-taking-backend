import { Request, Response, Router } from 'express';
const { flashcardsController } = require('../controllers');

const router = Router();

router.get('/', flashcardsController.getAll);

router.post('/', flashcardsController.create);

router.put('/:id', flashcardsController.update);

router.delete('/:id', flashcardsController.destroy);

module.exports = router;
