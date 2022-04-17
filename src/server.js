import express from 'express';
import routes from './routes.js';
import helmet from 'helmet';
import apiLimiter from './middleware/rateLimit.js';

const app = express();
app.use(helmet());
app.use(express.json());

app.use(apiLimiter);
app.use(routes);

export { app };
