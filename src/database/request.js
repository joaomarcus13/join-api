// import sql from 'mssql';
// import sqlConfig from '../config/database.js';
import { logger } from '../util/logger.js';
import conn from './connection.js';

// const pool = new sql.ConnectionPool(sqlConfig);
// pool.connect((err) => {
//   err
//     ? logger.error(err.message)
//     : logger.info('Successful database connection');
// });

export default async function (queryString) {
  try {
    const result = await conn.request().query(queryString);
    return result;
  } catch (err) {
    logger.error(err.message);
    throw new Error(err);
  }
}

// export default async function db(queryString, database = 'nugei') {
//   try {
//     const conn = await new sql.ConnectionPool(sqlConfig(database)).connect();
//     const result = await conn.request().query(queryString);
//     conn.close();
//     return result;
//   } catch (err) {
//     logger.error(err.message);
//     throw new Error(err);
//   }
// }
