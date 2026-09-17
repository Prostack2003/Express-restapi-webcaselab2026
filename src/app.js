import express from 'express';
import { apiRouter } from './routes/index.js';
import {
    errorHandler,
    notFoundHandler,
} from './middlewares/error.middleware.js';

const app = express();
const middleware = express.json();

app.use(middleware);
app.use('/api', apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
export { app };
