import db from '../database/request.js';
import queryInfoLicitacoes from '../database/queries/infoLicitacoes.js';
import { formatInfo } from '../util/formatValues.js';
import cache from '../config/cache.js';

export default {
  async index(request, response) {
    const queryString = queryInfoLicitacoes;
    // return response.json(
    //   formatInfo({
    //     valor_total: 100000,
    //     quantidade_licitacoes: 100,
    //     quantidade_itens: 100,
    //   })
    // );
    try {
      const value = cache.get('info');
      if (value) return response.json(value);
      const result = await db(queryString);
      cache.set('info', formatInfo(result.recordset[0]));
      return response.json(formatInfo(result.recordset[0]));
    } catch (err) {
      return response.status(500).send(err);
    }
  },
};
