import { AnswerInput, QuestionInput } from '../types';
import { Answer, PrismaClient, Question } from '@prisma/client';

class QAService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllQuestions(userId: string): Promise<Question[]> {
    return await this.prisma.question.findMany({ where: { userId } });
  }

  async getQuestionsByUser(userId: string): Promise<Question[]> {
    return await this.prisma.question.findMany({ where: { userId } });
  }

  async getAnswersToQuestion(questionId: string): Promise<Answer[]> {
    return await this.prisma.answer.findMany({
      where: { questionId },
    });
  }

  async getOneQuestion(id: string): Promise<Question> {
    const result = await this.prisma.question.findFirst({ where: { id } });
    console.log(result);
    if (!result) {
      throw new Error('not found');
    }
    return result;
  }

  async getOneAnswer(id: string): Promise<Answer> {
    const result = await this.prisma.answer.findFirst({ where: { id } });
    if (!result) {
      throw new Error('not found');
    }
    return result;
  }

  async createQuestion(data: QuestionInput, userId: string): Promise<Question> {
    return await this.prisma.question.create({
      data: { ...data, userId },
    });
  }

  async createAnswer(data: AnswerInput, userId: string): Promise<Answer> {
    return await this.prisma.answer.create({
      data: { ...data, userId },
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
