import express from 'express';
import routes from './routes.js';
import 'dotenv/config';
//node v16.13.1
const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.info(`Server started on port ${PORT}`);
});