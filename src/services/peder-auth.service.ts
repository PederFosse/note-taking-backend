import { badRequest, notFound } from '@hapi/boom';
import { PrismaClient, User } from '@prisma/client';
import { UserInput } from '../types';

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

  async getUserById(id: string): Promise<User | null> {
    const result = await this.prisma.user.findFirst({ where: { id } });
    return result;
  }

  async createUser(user: UserInput): Promise<User> {
    const foundUser = await this.prisma.user.findFirst({
      where: { username: user.username },
    });

    if (foundUser) {
      throw badRequest(`User with username: ${user.username} already exists!`);
    }

    const result = await this.prisma.user.create({
      data: user,
    });
    return result;
  }

  async updateUser(id: string, data: Partial<UserInput>): Promise<User> {
    const foundUser = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!foundUser) {
      throw notFound();
    }

    const result = await this.prisma.user.update({
      data,
      where: { id },
    });

    return result;
  }
}

export default new PederAuthService();
