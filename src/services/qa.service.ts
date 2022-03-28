import { Answer, AnswerInput, Question, QuestionInput } from '../types';
import { PrismaClient } from '@prisma/client';

class QAService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllQuestions(): Promise<Question[]> {
    return await this.prisma.question.findMany();
  }

  async getAnswersToQuestion(questionId: string): Promise<Answer[]> {
    return await this.prisma.answer.findMany({
      where: { questionId },
    });
  }

  async getOneQuestion(id: string): Promise<Question | null> {
    return await this.prisma.question.findFirst({
      where: { id },
    });
  }

  async getOneAnswer(id: string): Promise<Answer | null> {
    return await this.prisma.answer.findFirst({ where: { id } });
  }

  async createQuestion(data: QuestionInput): Promise<Question> {
    return await this.prisma.question.create({
      data,
    });
  }

  async createAnswer(data: AnswerInput): Promise<Answer> {
    return await this.prisma.answer.create({
      data,
    });
  }

  async updateQuestion(data: QuestionInput, id: string): Promise<Question> {
    return await this.prisma.question.update({
      data,
      where: { id },
    });
  }

  async updateAnswer(data: AnswerInput, id: string): Promise<Answer> {
    return await this.prisma.answer.update({
      data,
      where: { id },
    });
  }

  async destroyQuestion(id: string): Promise<Question> {
    return await this.prisma.question.delete({
      where: { id },
    });
  }

  async destroyAnswer(id: string): Promise<Answer> {
    return await this.prisma.answer.delete({
      where: { id },
    });
  }
}

export default new QAService();
