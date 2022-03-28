import express from 'express';
import {
  CommonRoutesConfig,
  FlashCardsRoutes,
  FlashcardsSetRoutes,
  QARoutes,
} from './routes';

const app = express();

const routes: Array<CommonRoutesConfig> = [];

// parse request-body as json
app.use(express.json());

routes.push(new FlashCardsRoutes(app));
// routes.push(new NotesRoutes(app));
routes.push(new QARoutes(app));
routes.push(new FlashcardsSetRoutes(app));

console.log(routes.map((r) => r.name));

app.listen(8080, () => console.log('server running!'));
