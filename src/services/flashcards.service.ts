import { Flashcard, FlashcardInput } from '../types';
import { v4 as uuidv4 } from 'uuid';

let flashcards: Flashcard[] = require('../data/flashcards');

class FlashCardsService {
  constructor() {}

  getAll = (): Flashcard[] => flashcards;

  create = (card: FlashcardInput): Flashcard => {
    const toCreate = { ...card, id: uuidv4() };
    flashcards.push(toCreate);
    return toCreate;
  };

  update = (card: FlashcardInput, id: string): Flashcard | false => {
    const old = flashcards.find((card) => card.id === id);
    const index = flashcards.findIndex((card) => card.id === id);

    if (!old) {
      return false; // TODO should maybe rethrow some notfound() errors instead
    }

    const updatedCard = {
      ...old,
      ...card,
    };

    flashcards[index] = updatedCard;
    return updatedCard;
  };

  destroy = (id: string): boolean => {
    // delete a flashcard
    const exists = flashcards.find((card) => card.id === id);
    if (exists) {
      flashcards = flashcards.filter((card) => card.id !== id);
      return true;
    } else {
      return false; // throw notfound
    }
  };
}

export default new FlashCardsService();
