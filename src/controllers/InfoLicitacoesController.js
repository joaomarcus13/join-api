import db from '../database/connection.js';
import queryInfoLicitacoes from '../database/queries/infoLicitacoes.js';
import { formatInfo } from '../util/formatValues.js';

export default {
  async index(request, response) {
    const queryString = queryInfoLicitacoes;
    // console.log(queryString);
    // return response.json(
    // formatInfo({
    //   valor_total: 100000,
    //   quantidade_licitacoes: 100,
    //   quantidade_itens: 100,
    // })
    // );
    try {
      const result = await db(queryString);
      return response.json(formatInfo(result.recordset[0]));
    } catch (err) {
      return response.status(500).send(err);
    }
  },
};
