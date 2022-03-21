import { Answer, AnswerInput, Question, QuestionInput } from '../types';
import { v4 as uuidv4 } from 'uuid';

let questions: Question[] = require('../data/qa/questions');
let answers: Answer[] = require('../data/qa/answers');

const getAllQuestions = (): Question[] => questions;
const getAnswersToQuestion = (questionId: string): Answer[] => {
  const result = answers.filter((a) => a.questionId === questionId);
  return result;
};

const getOneQuestion = (id: string): Question | false => {
  const result = questions.find((q) => q.id === id);
  if (!result) {
    return false; // throw not found
  }
  return result;
};

const getOneAnswer = (id: string): Answer | false => {
  const result = answers.find((a) => a.id === id);
  if (!result) {
    return false; // throw not found
  }
  return result;
};

const createQuestion = (q: QuestionInput): Question => {
  const toCreate = { ...q, id: uuidv4() };
  questions.push(toCreate);
  return toCreate;
};

const createAnswer = (a: AnswerInput): Answer => {
  const toCreate = { ...a, id: uuidv4() };
  answers.push(toCreate);
  return toCreate;
};

const updateQuestion = (q: QuestionInput, id: string): Question | false => {
  const oldQuestion = questions.find((q) => q.id === id);
  const index = questions.findIndex((q) => q.id === id);

  // question with id = id does not exist in "db"
  if (!oldQuestion) {
    return false; // throw notfound()
  }

  const updatedQuestion = {
    ...oldQuestion,
    ...q,
  };

  questions[index] = updatedQuestion;
  return updatedQuestion;
};

const updateAnswer = (q: AnswerInput, id: string): Answer | false => {
  const oldAnswer = answers.find((q) => q.id === id);
  const index = answers.findIndex((q) => q.id === id);

  // answer with id = id does not exist in "db"
  if (!oldAnswer) {
    return false; // throw notfound()
  }

  const updatedanswer = {
    ...oldAnswer,
    ...q,
  };

  answers[index] = updatedanswer;
  return updatedanswer;
};

const destroyQuestion = (id: string): boolean => {
  // delete a qestion
  const exists = questions.find((q) => q.id === id);
  if (exists) {
    questions = questions.filter((q) => q.id !== id);
    return true;
  } else {
    return false; // throw notfound
  }
};

const destroyAnswer = (id: string): boolean => {
  // delete a qestion
  const exists = answers.find((a) => a.id === id);
  if (exists) {
    answers = answers.filter((a) => a.id !== id);
    return true;
  } else {
    return false; // throw notfound
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
