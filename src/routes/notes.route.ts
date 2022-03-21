import { Router } from 'express';

const { notesController } = require('../controllers');
const router = Router();

// Get all notes
router.get('/', notesController.getAllNotes);

// Get one note
router.get('/:id', notesController.getOneNote);

// Create new note
router.post('/', notesController.createNewNote);

// Update a note
router.put('/:id', notesController.updateNote);

// Delete a note
router.delete('/:id', notesController.deleteNote);

module.exports = router;
