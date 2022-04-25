import { Flashcard, PrismaClient } from '@prisma/client';
import { FlashcardInput } from '../types';

class FlashCardsService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(userId: string): Promise<Flashcard[]> {
    return await this.prisma.flashcard.findMany({ where: { userId } });
  }

  async getOne(id: string): Promise<Flashcard> {
    const result = await this.prisma.flashcard.findFirst({
      where: { id },
    });

    if (!result) {
      throw new Error('not found');
    }

    return result;
  }

  async create(data: FlashcardInput, userId: string): Promise<Flashcard> {
    const created = await this.prisma.flashcard.create({
      data: {...data, userId},
    });
    return created;
  }

  async update(card: FlashcardInput, id: string): Promise<Flashcard> {
    const result = await this.prisma.flashcard.update({
      data: card,
      where: { id },
    });

    return result;
  }

  async destroy(id: string): Promise<Flashcard> {
    // delete a flashcard
    const result = await this.prisma.flashcard.delete({
      where: { id },
    });
    return result;
  }
}

export default new FlashCardsService();
