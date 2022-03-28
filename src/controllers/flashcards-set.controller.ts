import { Request, Response } from 'express';
import { Flashcard, FlashcardInput } from '../types';
import FlashcardSetService from '../services/flashcard-set.service';
import { FlashcardSet } from '@prisma/client';

class FlashcardsSetController {
  constructor() {}

  async getAll(req: Request, res: Response): Promise<void> {
    const flashcardSets: FlashcardSet[] = await FlashcardSetService.getAll();
    res.send(flashcardSets);
  }

  async create(req: Request, res: Response): Promise<void> {
    const flashcardSet: Omit<FlashcardSet, 'id'> = req.body;
    const created = await FlashcardSetService.create(flashcardSet);
    res.send(created);
  }

  async update(req: Request, res: Response): Promise<void> {
    const toUpdate: Omit<FlashcardSet, 'id'> = req.body;
    const id: string = req.params.id;
    const updated = await FlashcardSetService.update(toUpdate, id);
    if (!updated) {
      res
        .status(404)
        .json({ message: `flashcard with id ${id} does not exist!` });
    } else {
      res.send(updated);
    }
  }

  async destroy(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const result = await FlashcardSetService.delete(id);
    res.send(result);
  }
}

export default new FlashcardsSetController();
