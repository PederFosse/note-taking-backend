import { Boom } from '@hapi/boom';
import express, { Request, Response } from 'express';
const morgan = require('morgan');

import {
  CommonRoutesConfig,
  FlashCardsRoutes,
  FlashcardsSetRoutes,
  NotesRoutes,
  PederAuth,
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
routes.push(new PederAuth(app));

console.log(routes.map((r) => r.name));

// error handler
// @ts-ignore
app.use((error: Boom, req: Request, res: Response, _) => {
  const { message = 'Oops! Something went wrong', isBoom, output } = error;

  if (isBoom) {
    // if the error is explicitly thrown
    return res.status(output.statusCode).json({
      message,
      success: false,
    });
  }

  // return generic error response for unexpected error
  return res.status(500).json({
    success: false,
    message: 'Oops! Something went wrong',
  });
});

app.listen(8080, () => console.log('server running!'));
