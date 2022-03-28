import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import NotesService from '../services/notes.service'

const notes: Array<unknown> = [];

class NotesController {
  // Get all notes
  getAllNotes = (req: Request, res: Response): void => {
    res.json(notes);
  };

  // Get one note
  getOneNote = (req: Request, res: Response) => {
    const note = NotesService.getById(req.params.id);

    if (!note) {
      throw new Error('No note found');
    }

    res.json(note);
  };

  // Create a new note
  createNewNote = (req: Request, res: Response): void => {
    const newNote = {
      // Could consider sending in a userId eventually
      ...req.body,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      noteData: {
        header: 'New note',
        details: 'So many nice thoughts can go in here!',
      },
    };

    notes.push(newNote);
    // Sends back the note created
    res.json(newNote);
  };

  // Update a note
  updateNote = (req: Request, res: Response) => {
    const note = NotesService.getById(req.params.id);

    if (note) {
      const updNote = req.body;
      notes.forEach((loopedNote) => {
        if (loopedNote.id === req.params.id) {
          loopedNote.noteData.header = updNote.header
            ? updNote.header
            : note.noteData.header;
          loopedNote.noteData.details = updNote.details
            ? updNote.details
            : note.noteData.details;

          res.json({ msg: 'Note is updated', loopedNote });
        }
      });
    } else {
      res.status(400).json({ msg: 'Could not find the note' });
    }
  };

  // Delete note
  deleteNote = (req: Request, res: Response): void => {
    const foundNote = NotesService.getById(req.params.id);

    if (!foundNote) {
      throw new Error('No note found');
    }

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === foundNote.id) {
        notes.splice(i, 1);
      }
    }

    // Sends the rest of the notes back as json
    res.json(notes);
  };
}

export default new NotesController();
