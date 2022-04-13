import db from '../database/request.js';
import queryFilterOrgao from '../database/queries/filterOrgao.js';
import cities from '../assets/DistanciaCidade.json';
import { capitalize } from '../util/formatValues.js';

const mock = [
  { id: '1', nm_nome: 'secretaria 1' },
  { id: '2', nm_nome: 'secretaria 2' },
  { id: '3', nm_nome: 'secretaria 3' },
  { id: '4', nm_nome: 'secretaria 4' },
  { id: '5', nm_nome: 'secretaria 5' },
  { id: '6', nm_nome: 'secretaria 5' },
];
const mock2 = Object.entries(cities).map(([key, value]) => ({
  id: value.id,
  nm_nome: key,
}));

export default {
  async index(request, response) {
    const queryString = queryFilterOrgao(request.query);
    // console.log(queryString);
    // return response.json(mock2);
    try {
      const result = await db(queryString);
      // capitalize(result.recordset);
      return response.json(result.recordset);
    } catch (err) {
      return response.status(500).send(err);
    }
  },
};
