import { app } from './server.js';
import { logger } from './util/logger.js';
import 'dotenv/config';
//node v16.13.1
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
