import express from 'express';
import routes from './routes.js';
import helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(routes);

export { app };
