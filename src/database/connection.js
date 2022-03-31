import sql from 'mssql';
import sqlConfig from '../config/database.js';
import { logger } from '../util/logger.js';

const pool = new sql.ConnectionPool(sqlConfig);
pool.connect((err) => {
  err
    ? logger.error(err.message)
    : logger.info('Successful database connection');
});

export default pool;
