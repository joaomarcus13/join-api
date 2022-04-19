import queryItens from '../database/queries/itens.js';
import db from '../database/request.js';
import format from '../util/formatValues.js';

export default {
  async index(request, response) {
    const queryString = queryItens(request.query);
    // console.log(queryString);
    try {
      const result = await db(queryString);
      return response.json({
        itens: format(result.recordset),
        count: result.rowsAffected[result.rowsAffected.length - 1],
        qnt: result.recordset[0]?.qnt || 0,
      });
    } catch (err) {
      return response.status(500).send(err);
    }
  },
};
