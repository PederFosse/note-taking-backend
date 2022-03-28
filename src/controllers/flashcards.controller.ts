import { Flashcard } from '@prisma/client';
import { Request, Response } from 'express';
import FlashcardsService from '../services/flashcards.service';
import { FlashcardInput } from '../types';

class FlashcardsController {
  constructor() {}

  async getAll(req: Request, res: Response): Promise<void> {
    const flashcards = await FlashcardsService.getAll();
    res.send(flashcards);
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const flashcard = await FlashcardsService.getOne(req.params.id);
      res.send(flashcard);
    } catch (e) {
      res.status(404).send({ message: 'flashcard not found' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const flashcard: FlashcardInput = req.body;
    const created = await FlashcardsService.create(flashcard);
    res.send(created);
  }

  async update(req: Request, res: Response): Promise<void> {
    const toUpdate: FlashcardInput = req.body;
    const id: string = req.params.id;
    const updated = await FlashcardsService.update(toUpdate, id);
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
    const result = await FlashcardsService.destroy(id);
    res.send(result);
  }
}

export default new FlashcardsController();
