export interface QuestionInput {
  data: string;
}

export interface Question extends QuestionInput {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnswerInput {
  questionId: string;
  data: string;
}

export interface Answer extends AnswerInput {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
