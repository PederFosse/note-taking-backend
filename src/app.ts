import express, { NextFunction, Request, Response } from 'express';
const logger = require('./middleware/logger');

const app = express();

// logger
app.use(logger);

// dog-route
app.use('/dogs', require('./routes/dogs-routes'))

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.listen(8080, () => console.log('server running!'));
