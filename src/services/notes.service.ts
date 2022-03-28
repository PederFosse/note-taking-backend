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

  async getById(id: string): Promise<Note> {
    const result = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!result) {
      throw new Error('No note found');
    }

    return result;
  }

  async createNewNote(data: NoteInput): Promise<Note> {
    return await this.prisma.note.create({
      data,
    });
  }

  async updateNote(note: Note, id: string): Promise<Note> {
    const updatedNote = await this.prisma.note.update({
      where: { id },
      data: { ...note },
    });

    return updatedNote;
  }

  async deleteNote(id: string): Promise<Note[]> {
    await this.prisma.note.delete({
      where: { id },
    });
    const notes = await this.prisma.note.findMany();

    return notes;
  }
}

export default new NotesService();
