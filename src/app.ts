import express, { NextFunction, Request, Response, Router } from 'express';
import { CommonRoutesConfig } from './routes/common.routes.config';
import { FlashCardsRoutes } from './routes/flashcards.routes.config';
import { NotesRoutes } from './routes/notes.routes.config';
import { QARoutes } from './routes/qa.routes.config';

const app = express();

const routes: Array<CommonRoutesConfig> = [];

// parse request-body as json
app.use(express.json());

routes.push(new FlashCardsRoutes(app));
routes.push(new NotesRoutes(app));
routes.push(new QARoutes(app));

console.log(routes.map((r) => r.name));

app.listen(8080, () => console.log('server running!'));
