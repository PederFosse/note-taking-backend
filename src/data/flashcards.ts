import { Flashcard } from '../types/flashcards';
import { v4 as uuidv4 } from 'uuid';

const flashcards: Flashcard[] = [
  {
    header: 'TCP/IP',
    front: 'ip or something',
    back: 'tcp/ip!',
    id: uuidv4(),
  },
  {
    header: 'dog',
    front: 'four legs, 1 eye',
    back: 'a dog, possibly brown',
    id: uuidv4(),
  },
];

module.exports = flashcards;
