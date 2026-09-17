import express from 'express';
import { apiRouter } from './routes/index.js';

const app = express();
const middleware = express.json();

app.use(middleware);
app.use('/api', apiRouter);

export { app };
