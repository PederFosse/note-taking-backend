// Service for handling the route request and utilizing the correct service in a logical order
import { Note } from '@prisma/client';
import { forbidden } from '@hapi/boom';
import { Request, Response } from 'express';
import notesService from '../services/notes.service';
import NotesService from '../services/notes.service';
import { NoteInput, SessionUser } from '../types';

class NotesController {
  private async checkOwner(user: SessionUser, noteId: string): Promise<void> {
    const note = await notesService.getOne(noteId);

    if (user.id !== note.userId) {
      throw forbidden();
    }
    return;
  }
  // Get all notes
  async getAllNotes(req: Request, res: Response): Promise<void> {
    const notes: Note[] = await NotesService.getAll(req.user.id);
    res.send(notes);
  }

  // Get one note
  async getOne(req: Request, res: Response): Promise<void> {
    try {
      await this.checkOwner(req.user, req.params.id);
      const note = await NotesService.getOne(req.params.id);

      res.send(note);
    } catch (e) {
      res.status(404).send({ message: 'not found' });
    }
  }

  // Create a new note
  async createNewNote(req: Request, res: Response): Promise<void> {
    const newNote: NoteInput = req.body;
    const created = await NotesService.createNewNote(newNote, req.user.id);
    res.send(created);
  }

  // Update a note
  async updateNote(req: Request, res: Response): Promise<void> {
    const newValues = req.body;
    const noteId = req.params.id;

    await this.checkOwner(req.user, noteId);

    const updated = await NotesService.updateNote(newValues, noteId);
    res.send(updated);
  }

  // Delete note
  async deleteNote(req: Request, res: Response): Promise<void> {
    await this.checkOwner(req.user, req.params.id);

    const result = await NotesService.deleteNote(req.params.id);
    res.send(result);
  }
}

export default new NotesController();
