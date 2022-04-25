import { Flashcard } from '@prisma/client';
import { forbidden } from '@hapi/boom';
import { Request, Response } from 'express';
import FlashcardsService from '../services/flashcards.service';
import { FlashcardInput, SessionUser } from '../types';

class FlashcardsController {
  constructor() {}

  private async checkOwner(user: SessionUser, entryId: string): Promise<void> {
    const note = await FlashcardsService.getOne(entryId);

    if (user.id !== note.userId) {
      throw forbidden();
    }
    return;
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const flashcards = await FlashcardsService.getAll(req.user.id);
    res.send(flashcards);
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      await this.checkOwner(req.user, req.params.id);
      const flashcard = await FlashcardsService.getOne(req.params.id);
      res.send(flashcard);
    } catch (e) {
      res.status(404).send({ message: 'flashcard not found' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const flashcard: FlashcardInput = req.body;
    const created = await FlashcardsService.create(flashcard, req.user.id);
    res.send(created);
  }

  async update(req: Request, res: Response): Promise<void> {
    const toUpdate: FlashcardInput = req.body;
    const id: string = req.params.id;
    await this.checkOwner(req.user, id);

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
    await this.checkOwner(req.user, id);

    const result = await FlashcardsService.destroy(id);
    res.send(result);
  }
}

export default new FlashcardsController();
