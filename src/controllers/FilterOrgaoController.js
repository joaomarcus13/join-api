import db from '../database/request.js';
import queryFilterOrgao from '../database/queries/filterOrgao.js';

export default {
  async index(request, response) {
    const queryString = queryFilterOrgao(request.query);
    try {
      const result = await db(queryString);
      return response.json({
        orgaos: result.recordset,
        count: result.rowsAffected[result.rowsAffected.length - 1],
      });
    } catch (err) {
      return response.status(500).send(err);
    }
  },
};
