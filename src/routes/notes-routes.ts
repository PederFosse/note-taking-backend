import express, { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { notes } from '../data/notes';
import { INotes } from '../types';

const router = Router();

// Get all notes
router.get('/', (req: Request, res: Response) => res.json(notes));

// Get one note
router.get('/:id', (req: Request, res: Response) => {
  const note = notes.filter((note) => note.id === req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(400).json({ msg: `No note with the id of ${req.params.id} ` });
  }
});

// Create a new note
router.post('/', (req: Request, res: Response) => {
  const newNote = {
    ...req.body,
    id: uuidv4(),
    createdBy: 'Test User',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    noteData: {
      header: '',
      details: ''
    }
  };
});

module.exports = router;
