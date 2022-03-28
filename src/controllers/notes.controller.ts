<<<<<<< HEAD
/* import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import NotesService from '../services/notes.service'

const notes: Array<unknown> = [];
=======
// Service for handling the route request and utilizing the correct service in a logical order
import { Request, Response } from 'express';
// import { v4 as uuidv4 } from 'uuid';
import NotesService from '../services/notes.service';
import { Note } from '../types';
>>>>>>> 84e5305 (added prisma functionality for notes)

class NotesController {
  // Get all notes
  async getAllNotes(req: Request, res: Response): Promise<void> {
    const notes: Note[] = await NotesService.getAll();
    res.send(notes);
  }

  // Get one note
  async getOneNote(req: Request, res: Response): Promise<void> {
    const note = NotesService.getById(req.params.id);
    res.send(note);
  }

  // Create a new note
  async createNewNote(req: Request, res: Response): Promise<void> {
    const newNote: Note = req.body();
    const created = await NotesService.createNewNote(newNote);
    res.send(created);
  }

  // Update a note
  async updateNote(req: Request, res: Response): Promise<void> {
    const updatedNote = req.body();
    const id = req.params.id;
    const updated = await NotesService.updateNote(updatedNote, id);
    res.send(updated);
  }

  // Delete note
  async deleteNote(req: Request, res: Response): Promise<void> {
    const result = await NotesService.getById(req.params.id);
    res.send(result);
  }
}

export default new NotesController();
 */