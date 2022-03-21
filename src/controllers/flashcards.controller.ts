import { Request, Response } from 'express';
import { Flashcard, FlashcardInput } from '../types';

const { flashcardsService } = require('../services');

const getAll = (req: Request, res: Response): void => {
  const flashcards: Flashcard[] = flashcardsService.getAll();
  res.send(flashcards);
};

const create = (req: Request, res: Response): void => {
  const flashcard: FlashcardInput = req.body;
  const created = flashcardsService.create(flashcard);
  res.send(created);
};

const update = (req: Request, res: Response): void => {
  const toUpdate: FlashcardInput = req.body;
  const id: string = req.params.id;
  const updated = flashcardsService.update(toUpdate, id);
  if (!updated) {
    res
      .status(404)
      .json({ message: `flashcard with id ${id} does not exist!` });
  } else {
    res.send(updated);
  }
};

module.exports = {
  getAll,
  create,
  update
};