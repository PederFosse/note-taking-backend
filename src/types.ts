import {
  Answer,
  Flashcard,
  FlashcardSet,
  Note,
  Question,
} from '@prisma/client';

export interface User {
  id: string,
  scope: string[],
}

export type FlashcardInput = Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>;

export type AnswerInput = Omit<Answer, 'id' | 'createdAt' | 'updatedAt'>;

export type QuestionInput = Omit<Question, 'id' | 'createdAt' | 'updatedAt'>;

export type FlashcardSetInput = Omit<
  FlashcardSet,
  'id' | 'createdAt' | 'updatedAt'
>;

export type NoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;