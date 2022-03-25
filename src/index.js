import { logger } from './util/logger.js';
import 'dotenv/config';
//node v16.13.1

const app = express();

app.use(helmet());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
