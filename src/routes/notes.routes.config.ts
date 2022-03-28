/* import { Application, Router } from "express";
import { CommonRoutesConfig } from "./common.routes.config";

import NotesController from "../controllers/notes.controller";

export class NotesRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, '/notes');
  }

  configureRoutes(): Application {
    const router = Router();

    // Get all notes
    router.get('/', NotesController.getAllNotes);

    // Get one note
    router.get('/:id', NotesController.getOneNote);

    // Create new note
    router.post('/', NotesController.createNewNote);

    // Update a note
    router.put('/:id', NotesController.updateNote);

    // Delete a note
    router.delete('/:id', NotesController.deleteNote);

    this.app.use(this.getName(), router);
    return this.app;
  }
} */