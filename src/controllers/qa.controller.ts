import { Request, Response } from 'express';
import { Answer, AnswerInput, Question, QuestionInput } from '../types';
const { qaService } = require('../services');

const createQuestion = (req: Request, res: Response): void => {
  const question: Question = qaService.createQuestion(req.body);
  res.send(question);
};

const createAnswer = (req: Request, res: Response): void => {
  const id = req.params.id;
  const answerInput: AnswerInput = { ...req.body, questionId: id };
  const answer: Answer = qaService.createAnswer(answerInput);
  res.send(answer);
};

const getAllQuestions = (req: Request, res: Response): void => {
  const questions: Question[] = qaService.getAllQuestions();
  res.send(questions);
};

const getOneQuestion = (req: Request, res: Response): void => {
  const questionId = req.params.id;
  const question: Question | false = qaService.getOneQuestion(questionId);
  if (!question) {
    res
      .status(404)
      .json({ message: `could not find question with id ${questionId}` });
  } else {
    res.send(question);
  }
};

const getAnswersToQuestion = (req: Request, res: Response): void => {
  const questionId = req.params.id;
  const answers: Answer[] | false = qaService.getAnswersToQuestion(questionId);
  if (!answers) {
    res
      .status(404)
      .json({ message: `could not find question with id ${questionId}` });
  } else {
    res.send(answers);
  }
};

const getOneAnswer = (req: Request, res: Response): void => {
  const id = req.params.id;
  const answer: Answer | false = qaService.getOneAnswer(id);
  if (!answer) {
    res.status(404).json({ message: `could not find answer with id ${id}` });
  } else {
    res.send(answer);
  }
};

const updateQuestion = (req: Request, res: Response): void => {
  const toUpdate: QuestionInput = req.body;
  const id: string = req.params.id;
  const updated: Question | false = qaService.updateQuestion(toUpdate, id);
  if (!updated) {
    res.status(404).json({ message: `could not find question with id ${id}` });
  } else {
    res.send(updated);
  }
};

const updateAnswer = (req: Request, res: Response): void => {
  const toUpdate: AnswerInput = req.body;
  const id: string = req.params.id;
  const updated: Answer | false = qaService.updateAnswer(toUpdate, id);
  if (!updated) {
    res.status(404).json({ message: `could not find answer with id ${id}` });
  } else {
    res.send(updated);
  }
};

const destroyQuestion = (req: Request, res: Response): void => {
  const id = req.params.id;
  const wasDeleted: boolean = qaService.destroyQuestion(id);
  if (wasDeleted) {
    res.send({ message: 'success' });
  } else {
    res.status(404).json({ message: `could not find question with id ${id}` });
  }
};

const destroyAnswer = (req: Request, res: Response): void => {
  const id = req.params.id;
  const wasDeleted: boolean = qaService.destroyAnswer(id);
  if (wasDeleted) {
    res.send({ message: 'success' });
  } else {
    res.status(404).json({ message: `could not find answer with id ${id}` });
  }
};

module.exports = {
  createQuestion,
  createAnswer,
  getAllQuestions,
  getOneQuestion,
  getAnswersToQuestion,
  getOneAnswer,
  updateQuestion,
  updateAnswer,
  destroyQuestion,
  destroyAnswer,
};
