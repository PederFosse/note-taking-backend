import {
  Answer,
  Flashcard,
  FlashcardSet,
  Note,
  Question,
  User,
} from '@prisma/client';

export interface SessionUser {
  id: string;
  scope: string[];
}

export enum UserScopeEnum {
  USER = 'User',
  ADMIN = 'Admin',
}

export type FlashcardInput = Omit<
  Flashcard,
  'id' | 'createdAt' | 'updatedAt' | 'userId'
>;

export type AnswerInput = Omit<
  Answer,
  'id' | 'createdAt' | 'updatedAt' | 'userId'
>;

export type QuestionInput = Omit<
  Question,
  'id' | 'createdAt' | 'updatedAt' | 'userId'
>;

export type FlashcardSetInput = Omit<
  FlashcardSet,
  'id' | 'createdAt' | 'updatedAt' | 'userId'
>;

export interface UserInput {
  username: string;
  password: string;
  scope?: UserScopeEnum[];
}

export type NoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;
