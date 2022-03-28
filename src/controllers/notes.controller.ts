// Service for handling the route request and utilizing the correct service in a logical order
import { Note } from '@prisma/client';
import { Request, Response } from 'express';
import NotesService from '../services/notes.service';
import { NoteInput } from '../types';

class NotesController {
  // Get all notes
  async getAllNotes(req: Request, res: Response): Promise<void> {
    const notes: Note[] = await NotesService.getAll();
    res.send(notes);
  }

  // Get one note
  async getOneNote(req: Request, res: Response): Promise<void> {
    const note = await NotesService.getById(req.params.id);
    res.send(note);
  }

  // Create a new note
  async createNewNote(req: Request, res: Response): Promise<void> {
    const newNote: NoteInput = req.body;
    const created = await NotesService.createNewNote(newNote);
    res.send(created);
  }

  // Update a note
  async updateNote(req: Request, res: Response): Promise<void> {
    const updatedNote = req.body;
    const id = req.params.id;
    const updated = await NotesService.updateNote(updatedNote, id);
    res.send(updated);
  }

  // Delete note
  async deleteNote(req: Request, res: Response): Promise<void> {
    const result = await NotesService.deleteNote(req.params.id);
    res.send(result);
  }
}

export default new NotesController();
