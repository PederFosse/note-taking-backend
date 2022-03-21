import { Router } from 'express';
const dogsRoute = require('./dogs.route');
// const flashCardRoute = require('./flashcards.route');
const notesRoute = require('./notes.route');

const router = Router();

const defaultRoutes = [
  { path: '/dogs', route: dogsRoute },
  // { path: '/flashcards', route: flashCardRoute },
  { path: '/notes', route: notesRoute }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
