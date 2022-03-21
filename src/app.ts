import express, { NextFunction, Request, Response } from 'express';
const routes = require('./routes');

const app = express();

// dog-route
app.use('/', routes);

app.listen(8080, () => console.log('server running!'));
