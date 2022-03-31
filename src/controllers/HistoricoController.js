import db from '../database/request.js';
import queryHistorico from '../database/queries/historico.js';

export default {
  async store(request, response) {
    const queryString = queryHistorico.insert(request.body);
    try {
      await db(queryString);
      return response.sendStatus(200);
    } catch (err) {
      return response.status(500).send(err);
    }
  },
  async index(request, response) {
    const queryString = queryHistorico.select();
    try {
      const result = await db(queryString);
      return response.json(result.recordset);
    } catch (err) {
      return response.status(500).send(err);
    }
  },
};
