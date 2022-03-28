// Service for handling database logic
import { Note, PrismaClient } from '@prisma/client';
import { NoteInput } from '../types';

class NotesService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(): Promise<Note[]> {
    const result = await this.prisma.note.findMany();
    return result;
  }

  async getOne(id: string): Promise<Note> {
    const result = await this.prisma.note.findFirst({
      where: { id },
    });

    if (!result) {
      throw new Error('not found');
    }

    return result;
  }

  async createNewNote(data: NoteInput): Promise<Note> {
    return await this.prisma.note.create({
      data,
    });
  }

  async updateNote(data: NoteInput, id: string): Promise<Note> {
    const updatedNote = await this.prisma.note.update({
      where: { id },
      data: { ...data },
    });

    return updatedNote;
  }

  async deleteNote(id: string): Promise<Note> {
    return await this.prisma.note.delete({
      where: { id },
    });
  }
}

export default new NotesService();
