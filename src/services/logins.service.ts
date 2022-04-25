import { badRequest, notFound } from '@hapi/boom';
import { Logins, PrismaClient, User } from '@prisma/client';
import { UserInput } from '../types';

class LoginsService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(userId: string): Promise<void> {
    await this.prisma.logins.create({ data: { userId } });
  }

  async getAll(): Promise<Logins[]> {
    return await this.prisma.logins.findMany();
  }
}

export default new LoginsService();
