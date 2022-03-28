import { Request, Response } from 'express';
import { Answer, AnswerInput, Question, QuestionInput } from '../types';
import QAService from '../services/qa.service';

class QAController {
  createQuestion = (req: Request, res: Response): void => {
    const question: Question = QAService.createQuestion(req.body);
    res.send(question);
  };

  createAnswer = (req: Request, res: Response): void => {
    const id = req.params.id;
    const answerInput: AnswerInput = { ...req.body, questionId: id };
    const answer: Answer = QAService.createAnswer(answerInput);
    res.send(answer);
  };

  getAllQuestions = (req: Request, res: Response): void => {
    const questions: Question[] = QAService.getAllQuestions();
    res.send(questions);
  };

  getOneQuestion = (req: Request, res: Response): void => {
    const questionId = req.params.id;
    const question: Question | false = QAService.getOneQuestion(questionId);
    if (!question) {
      res
        .status(404)
        .json({ message: `could not find question with id ${questionId}` });
    } else {
      res.send(question);
    }
  };

  getAnswersToQuestion = (req: Request, res: Response): void => {
    const questionId = req.params.id;
    const answers: Answer[] | false =
      QAService.getAnswersToQuestion(questionId);
    if (!answers) {
      res
        .status(404)
        .json({ message: `could not find question with id ${questionId}` });
    } else {
      res.send(answers);
    }
  };

  getOneAnswer = (req: Request, res: Response): void => {
    const id = req.params.id;
    const answer: Answer | false = QAService.getOneAnswer(id);
    if (!answer) {
      res.status(404).json({ message: `could not find answer with id ${id}` });
    } else {
      res.send(answer);
    }
  };

  updateQuestion = (req: Request, res: Response): void => {
    const toUpdate: QuestionInput = req.body;
    const id: string = req.params.id;
    const updated: Question | false = QAService.updateQuestion(toUpdate, id);
    if (!updated) {
      res
        .status(404)
        .json({ message: `could not find question with id ${id}` });
    } else {
      res.send(updated);
    }
  };

  updateAnswer = (req: Request, res: Response): void => {
    const toUpdate: AnswerInput = req.body;
    const id: string = req.params.id;
    const updated: Answer | false = QAService.updateAnswer(toUpdate, id);
    if (!updated) {
      res.status(404).json({ message: `could not find answer with id ${id}` });
    } else {
      res.send(updated);
    }
  };

  destroyQuestion = (req: Request, res: Response): void => {
    const id = req.params.id;
    const wasDeleted: boolean = QAService.destroyQuestion(id);
    if (wasDeleted) {
      res.send({ message: 'success' });
    } else {
      res
        .status(404)
        .json({ message: `could not find question with id ${id}` });
    }
  };

  destroyAnswer = (req: Request, res: Response): void => {
    const id = req.params.id;
    const wasDeleted: boolean = QAService.destroyAnswer(id);
    if (wasDeleted) {
      res.send({ message: 'success' });
    } else {
      res.status(404).json({ message: `could not find answer with id ${id}` });
    }
  };
}

export default new QAController();