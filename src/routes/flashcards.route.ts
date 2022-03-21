import { Request, Response, Router } from 'express';
const { flashcardsController } = require('../controllers');

const router = Router();

console.log(flashcardsController)
router.get('/', flashcardsController.getAll);

router.post('/', flashcardsController.create);

module.exports = router;
