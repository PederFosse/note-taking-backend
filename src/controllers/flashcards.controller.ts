import { Request, Response } from 'express';
import { Flashcard, FlashcardInput } from '../types';
import FlashcardsService from '../services/flashcards.service';

class FlashcardsController {
  constructor() {}

  getAll = (req: Request, res: Response): void => {
    const flashcards: Flashcard[] = FlashcardsService.getAll();
    res.send(flashcards);
  };

  create = (req: Request, res: Response): void => {
    const flashcard: FlashcardInput = req.body;
    const created = FlashcardsService.create(flashcard);
    res.send(created);
  };

  update = (req: Request, res: Response): void => {
    const toUpdate: FlashcardInput = req.body;
    const id: string = req.params.id;
    const updated = FlashcardsService.update(toUpdate, id);
    if (!updated) {
      res
        .status(404)
        .json({ message: `flashcard with id ${id} does not exist!` });
    } else {
      res.send(updated);
    }
  };

  destroy = (req: Request, res: Response): void => {
    const id = req.params.id;
    const wasDeleted = FlashcardsService.destroy(id);
    if (wasDeleted) {
      res.send({ message: 'success' });
    } else {
      res
        .status(404)
        .send({ message: `could not find flashcard with id ${id}` });
    }
  };
}

export default new FlashcardsController();
