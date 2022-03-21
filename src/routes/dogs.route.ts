import { Router } from 'express';
const { dogsController } = require('../controllers');

const router = Router();

router.get('/', dogsController.getAllDogs);

router.get('/:id', dogsController.getOneDog);

module.exports = router;
