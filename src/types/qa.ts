export interface QuestionInput {
  question: string;
}

export interface Question extends QuestionInput {
  id: string;
}

export interface AnswerInput {
  questionId: string;
  data: string;
}

export interface Answer extends AnswerInput {
  id: string;
}
