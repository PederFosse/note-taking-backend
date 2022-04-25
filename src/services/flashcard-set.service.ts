import { FlashcardSet, PrismaClient } from '@prisma/client';
import { FlashcardSetInput } from '../types';

class FlashCardSetService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(userId: string): Promise<FlashcardSet[]> {
    return await this.prisma.flashcardSet.findMany({ where: { userId } });
  }

  async getOne(id: string): Promise<FlashcardSet> {
    const result = await this.prisma.flashcardSet.findFirst({
      where: { id },
    });
    if (!result) throw new Error('not found');
    return result;
  }

  async create(data: FlashcardSetInput, userId: string): Promise<FlashcardSet> {
    return await this.prisma.flashcardSet.create({
      data: {...data, userId},
    });
  }

  async update(
    data: FlashcardSetInput,
    id: string
  ): Promise<FlashcardSet> {
    return await this.prisma.flashcardSet.update({
      data,
      where: { id },
    });
  }

  async delete(id: string): Promise<FlashcardSet> {
    return await this.prisma.flashcardSet.delete({
      where: { id },
    });
  }
}

export default new FlashCardSetService();
