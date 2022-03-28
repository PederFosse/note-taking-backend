import { Flashcard, FlashcardInput } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

class FlashCardsService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(): Promise<Flashcard[]> {
    return await this.prisma.flashcard.findMany();
  }

  async create(card: FlashcardInput): Promise<Flashcard> {
    const data = {
      id: uuidv4(),
      ...card,
    };

    const created = await this.prisma.flashcard.create({
      data,
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
