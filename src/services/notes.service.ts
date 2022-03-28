// Service for handling database logic
import { Note } from '../types';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

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
      where: { id }
    });

    if (!result) {
      throw new Error('No note found');
    }

    return result;
  }

  async createNewNote(note: Note): Promise<Note> {
    const newNote = await this.prisma.note.create({
      data: {
        ...note,
        id: uuidv4()
      }
    });

    return newNote;
  }

  async updateNote(note: Note, id: string): Promise<Note> {
    const updatedNote = await this.prisma.note.update({
      where: { id },
      data: { ...note }
    });

    return updatedNote;
  }

  async deleteNote(id: string): Promise<Note[]> {
    await this.prisma.note.delete({
      where: { id }
    });
    const notes = await this.prisma.note.findMany();

    return notes;
  }
}

export default new NotesService();
