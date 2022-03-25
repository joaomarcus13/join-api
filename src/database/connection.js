import sql from 'mssql';
import sqlConfig from '../config/database.js';
import { logger } from '../util/logger.js';

export default async function db(queryString, database = 'nugei') {
  try {
    const conn = await new sql.ConnectionPool(sqlConfig(database)).connect();
    const result = await conn.request().query(queryString);
    conn.close();
    return result;
  } catch (err) {
    logger.error(err.message);
    throw new Error(err);
  }
}
