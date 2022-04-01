import { logger } from '../util/logger.js';
import conn from './connection.js';

export default async function (queryString) {
  try {
    const result = await conn.request().query(queryString);
    return result;
  } catch (err) {
    logger.error(err.message);
    throw new Error(err);
  }
}
