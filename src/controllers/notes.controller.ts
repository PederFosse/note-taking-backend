import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { notes } from '../data/notes';

const { notesService } = require('../services');

// Get all notes
const getAllNotes = (req: Request, res: Response): void => {
  res.json(notes);
};

// Get one note
const getOneNote = (req: Request, res: Response) => {
  const note = notesService.getById(req.params.id);

  if (!note) {
    throw new Error('No note found');
  }

  res.json(note);
};

// Create a new note
const createNewNote = (req: Request, res: Response): void => {
  const newNote = {
    // Could consider sending in a userId eventually
    ...req.body,
    id: uuidv4(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    noteData: {
      header: '',
      details: ''
    }
  };

  notes.push(newNote);
  // Sends back the note created
  res.json(newNote);
};

// Update a note
const updateNote = (req: Request, res: Response) => {
  const note = notesService.getById(req.params.id);

  if (note) {
    const updateNote = req.body;
    notes.forEach((note) => {
      if (note.id === req.params.id) {
        note.noteData.header = updateNote.header;
        note.noteData.details = updateNote.details;

        res.json({ msg: 'Note is updated', note: note });
      }
    });
  } else {
    res.status(400).json({ msg: 'Could not find the note' });
  }
};

// Delete note
const deleteNote = (req: Request, res: Response): void => {
  const foundNote = notesService.getById(req.params.id);

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

module.exports = {
  getAllNotes,
  getOneNote,
  createNewNote,
  updateNote,
  deleteNote
};
