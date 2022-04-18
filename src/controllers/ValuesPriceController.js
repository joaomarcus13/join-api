import queryValues from '../database/queries/price.js';
import db from '../database/request.js';

export default {
  async index(request, response) {
    const queryString = queryValues(request.query);
    try {
      const result = await db(queryString);
      return response.json({
        values: result?.recordset[0],
      });
    } catch (err) {
      return response.status(500).send(err);
    }
  },
};
