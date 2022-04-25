import { Request, Response } from 'express';
import FlashcardSetService from '../services/flashcard-set.service';
import { FlashcardSet } from '@prisma/client';
import { FlashcardSetInput, SessionUser } from '../types';
import { forbidden } from '@hapi/boom';

class FlashcardsSetController {
  constructor() {}

  private async checkOwner(user: SessionUser, entryId: string): Promise<void> {
    const note = await FlashcardSetService.getOne(entryId);

    if (user.id !== note.userId) {
      throw forbidden();
    }
    return;
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const flashcardSets: FlashcardSet[] = await FlashcardSetService.getAll(
      req.user.id
    );
    res.send(flashcardSets);
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      await this.checkOwner(req.user, req.params.id);
      const flashcardSet = await FlashcardSetService.getOne(req.params.id);
      res.send(flashcardSet);
    } catch (e) {
      res.status(404).send({ message: 'flashcard set not found' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const flashcardSet: FlashcardSetInput = req.body;
    const created = await FlashcardSetService.create(flashcardSet, req.user.id);
    res.send(created);
  }

  async update(req: Request, res: Response): Promise<void> {
    const toUpdate: FlashcardSetInput = req.body;
    const id: string = req.params.id;

    await this.checkOwner(req.user, id);

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
    await this.checkOwner(req.user, id);
    const result = await FlashcardSetService.delete(id);
    res.send(result);
  }
}

export default new FlashcardsSetController();
