import { FlashcardSet, PrismaClient } from '@prisma/client';

class FlashCardSetService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(): Promise<FlashcardSet[]> {
    return await this.prisma.flashcardSet.findMany();
  }

  async getOne(id: string): Promise<FlashcardSet> {
    const result = await this.prisma.flashcardSet.findFirst({
      where: { id },
    });
    if (!result) throw new Error('not found');
    return result;
  }

  async create(data: Omit<FlashcardSet, 'id'>): Promise<FlashcardSet> {
    return await this.prisma.flashcardSet.create({
      data,
    });
  }

  async update(
    data: Omit<FlashcardSet, 'id'>,
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
