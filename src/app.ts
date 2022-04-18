import express from 'express';
const morgan = require('morgan');

import {
  CommonRoutesConfig,
  FlashCardsRoutes,
  FlashcardsSetRoutes,
  NotesRoutes,
  QARoutes,
} from './routes';

const app = express();

const routes: Array<CommonRoutesConfig> = [];

// parse request-body as json
app.use(express.json());
app.use(morgan('tiny'));

routes.push(new FlashCardsRoutes(app));
routes.push(new NotesRoutes(app));
routes.push(new QARoutes(app));
routes.push(new FlashcardsSetRoutes(app));

console.log(routes.map((r) => r.name));

app.listen(8080, () => console.log('server running!'));
