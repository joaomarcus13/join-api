import queryValues from '../database/queries/price.js';
import db from '../database/connection.js';

export default {
  async index(request, response) {
    const queryString = queryValues(request.query);
    // return response.json({ values: { max: 100, min: 10 }});
    try {
      const result = await db(queryString);
      // console.log('result', result.recordset[0]);
      return response.json({
        values: result.recordset[0],
      });
    } catch (err) {
      return response.status(500).send(err);
    }
  },
};
