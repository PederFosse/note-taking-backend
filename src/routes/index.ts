import { Router } from 'express';
const dogsRoute = require('./dogs.route');
const flashCardRoute = require('./flashcards.route');

const router = Router();

const defaultRoutes = [
  { path: '/dogs', route: dogsRoute },
  { path: '/flashcards', route: flashCardRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
