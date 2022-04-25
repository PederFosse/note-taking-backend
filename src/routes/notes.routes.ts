// Route for handling request urls and sending to controller
import { Application, Router } from 'express';
import { CommonRoutesConfig } from './common.routes.config';

import NotesController from '../controllers/notes.controller';

export class NotesRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, '/notes');
  }

  configureRoutes(): Application {
    const router = Router();

    // Get all notes
    router.get('/', NotesController.getAllNotes.bind(NotesController));

    // Get one note
    router.get('/:id', NotesController.getOne.bind(NotesController));

    // Create new note
    router.post('/', NotesController.createNewNote.bind(NotesController));

    // Update a note
    router.put('/:id', NotesController.updateNote.bind(NotesController));

    // Delete a note
    router.delete('/:id', NotesController.deleteNote.bind(NotesController));

    this.app.use(this.getName(), router);
    return this.app;
  }
}
