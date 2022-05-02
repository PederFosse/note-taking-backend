import { User } from '@prisma/client';
import express from 'express';
import { AnswerInput, FlashcardInput, QuestionInput, SessionUser } from '../src/types';

declare global {
  namespace Express {
    interface Request {
      user: SessionUser;
      created?: User,
      defaultNote: string,
      defaultFlashcards: FlashcardInput[],
      defaultQuestions: QuestionInput[],
      defaultAnswers: AnswerInput[],
    }
  }
}
