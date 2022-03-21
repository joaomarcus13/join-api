import queryValues from '../database/queries/price.js';
import db from '../database/connection.js';
import format from '../util/formatValues.js';

export default {
  async index(request, response) {
    const queryString = queryValues(request.query);
    console.log('string', queryString);
    // return response.json(mock);
    // console.log('query', request.query.referencePrice);
    // return response.json({ values: { max: 100, min: 10, avg: 50 } });
    try {
      const result = await db(queryString);
      // console.log(result.recordset[0]);
      return response.json({
        values: result.recordset[0],
      });
    } catch (err) {
      console.log('err', err);
      return response.status(500).send(err);
    }
  },
};
