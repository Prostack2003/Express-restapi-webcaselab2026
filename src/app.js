import express from 'express';
import { apiRouter } from './routes/index.js';
import {
    errorHandler,
    notFoundHandler,
} from './middlewares/error.middleware.js';
import { requestIdMiddleware } from './middlewares/request-id.middleware.js';
import { requestLoggerMiddleware } from './middlewares/request-logger.middleware.js';

const app = express();
const middleware = express.json();

app.use(requestIdMiddleware);
app.use(requestLoggerMiddleware);
app.use(middleware);
app.use('/api', apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
export { app };
