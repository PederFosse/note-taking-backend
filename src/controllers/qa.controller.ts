import { Answer, Question } from '@prisma/client';
import { Request, Response } from 'express';
import QAService from '../services/qa.service';
import { AnswerInput, QuestionInput, SessionUser } from '../types';

class QAController {
  async createQuestion(req: Request, res: Response): Promise<void> {
    const question: Question = await QAService.createQuestion(req.body, req.user.id);
    res.send(question);
  }

  async createAnswer(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const answerInput: AnswerInput = { ...req.body, questionId: id };
    const answer: Answer = await QAService.createAnswer(answerInput, req.user.id);
    res.send(answer);
  }

  async getAllQuestions(req: Request, res: Response): Promise<void> {
    const questions: Question[] = await QAService.getAllQuestions();
    res.send(questions);
  }

  async getAllQuestionsByUser(req: Request, res: Response): Promise<void> {
    const questions: Question[] = await QAService.getQuestionsByUser(req.user.id);
    res.send(questions);
  }

  async getOneQuestion(req: Request, res: Response): Promise<void> {
    try {
      const answer = await QAService.getOneQuestion(req.params.id);
      res.send(answer);
    } catch (e) {
      res
        .status(404)
        .json({ message: `could not find answer with id ${req.params.id}` });
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
    try {
      const answer = await QAService.getOneAnswer(req.params.id);
      res.send(answer);
    } catch (e) {
      res
        .status(404)
        .json({ message: `could not find answer with id ${req.params.id}` });
    }
  }

  async updateQuestion(req: Request, res: Response): Promise<void> {
    const toUpdate: QuestionInput = req.body;
    const id: string = req.params.id;
    const updated = await QAService.updateQuestion(toUpdate, id);
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
    const updated = await QAService.updateAnswer(toUpdate, id);
    if (!updated) {
      res.status(404).json({ message: `could not find answer with id ${id}` });
    } else {
      res.send(updated);
    }
  }

  async destroyQuestion(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const result = await QAService.destroyQuestion(id);
    res.send(result);
  }

  async destroyAnswer(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const result = await QAService.destroyAnswer(id);
    res.send(result);
  }
}

export default new QAController();
