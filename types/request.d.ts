import { User } from '@prisma/client';
import express from 'express';
import { AnswerInput, FlashcardInput, NoteInput, QuestionInput, SessionUser } from '../src/types';

declare global {
  namespace Express {
    interface Request {
      user: SessionUser;
      created?: User,
      defaultNotes: NoteInput[],
      defaultFlashcards: FlashcardInput[],
      defaultQuestions: QuestionInput[],
      defaultAnswers: AnswerInput[],
    }
  }
}
