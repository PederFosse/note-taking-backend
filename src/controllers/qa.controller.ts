import { Answer, Question } from '@prisma/client';
import { Request, Response } from 'express';
import QAService from '../services/qa.service';
import { AnswerInput, QuestionInput } from '../types';

class QAController {
  async createQuestion(req: Request, res: Response): Promise<void> {
    const question: Question = await QAService.createQuestion(req.body);
    res.send(question);
  }

  async createAnswer(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const answerInput: AnswerInput = { ...req.body, questionId: id };
    const answer: Answer = await QAService.createAnswer(answerInput);
    res.send(answer);
  }

  async getAllQuestions(req: Request, res: Response): Promise<void> {
    const questions: Question[] = await QAService.getAllQuestions();
    res.send(questions);
  }

  async getOneQuestion(req: Request, res: Response): Promise<void> {
    const questionId = req.params.id;
    const question: Question | null = await QAService.getOneQuestion(
      questionId
    );
    if (!question) {
      res
        .status(404)
        .json({ message: `could not find question with id ${questionId}` });
    } else {
      res.send(question);
    }
  }

  async getAnswersToQuestion(req: Request, res: Response): Promise<void> {
    const questionId = req.params.id;
    const answers: Answer[] | false = await QAService.getAnswersToQuestion(
      questionId
    );
    if (!answers) {
      res
        .status(404)
        .json({ message: `could not find question with id ${questionId}` });
    } else {
      res.send(answers);
    }
  }

  async getOneAnswer(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const answer: Answer | null = await QAService.getOneAnswer(id);
    if (!answer) {
      res.status(404).json({ message: `could not find answer with id ${id}` });
    } else {
      res.send(answer);
    }
  }

  async updateQuestion(req: Request, res: Response): Promise<void> {
    const toUpdate: QuestionInput = req.body;
    const id: string = req.params.id;
    const updated: Question | false = await QAService.updateQuestion(
      toUpdate,
      id
    );
    if (!updated) {
      res
        .status(404)
        .json({ message: `could not find question with id ${id}` });
    } else {
      res.send(updated);
    }
  }

  async updateAnswer(req: Request, res: Response): Promise<void> {
    const toUpdate: AnswerInput = req.body;
    const id: string = req.params.id;
    const updated: Answer | false = await QAService.updateAnswer(toUpdate, id);
    if (!updated) {
      res.status(404).json({ message: `could not find answer with id ${id}` });
    } else {
      res.send(updated);
    }
  }

  async destroyQuestion(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const result: Question = await QAService.destroyQuestion(id);
    res.send(result);
  }

  async destroyAnswer(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const result = await QAService.destroyAnswer(id);
    res.send(result);
  }
}

export default new QAController();
