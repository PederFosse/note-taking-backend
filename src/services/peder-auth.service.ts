import { badRequest, notFound } from '@hapi/boom';
import { PrismaClient, User } from '@prisma/client';

class PederAuthService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUser(username: string): Promise<User> {
    const result = await this.prisma.user.findFirst({ where: { username } });
    if (!result) {
      throw notFound();
    } else {
      return result;
    }
  }

  async createUser(username: string, password: string): Promise<User> {
    const foundUser = await this.prisma.user.findFirst({
      where: { username },
    });

    if (foundUser) {
      throw badRequest(`User with username: ${username} already exists!`);
    }

    const result = await this.prisma.user.create({
      data: { username, password },
    });
    return result;
  }
}

export default new PederAuthService();
