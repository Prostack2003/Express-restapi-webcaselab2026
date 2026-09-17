import express from 'express';

const app = express();
const middleware = express.json();

app.use(middleware);

export { app };
