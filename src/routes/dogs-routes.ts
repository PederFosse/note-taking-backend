import { Request, Response, Router } from 'express';
import { DogsController } from '../controllers/dogs-controllers';

const controller = new DogsController();

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const dogs = controller.getAllDogs();
  res.json(dogs);
});

router.get('/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const dog = controller.getOneDog(id);
  if (dog) {
    res.json({ data: dog });
  } else {
    res.status(404).json({ message: `Could not find dog with id ${id}` });
  }
});

module.exports = router;
