import municipios from './../assets/municipios_api.json';
import { accent } from '../util/formatValues.js';

export default {
  async index(request, response) {
    console.log(request.query.q);
    const { q } = request.query;
    let filtered = q
      ? municipios
          .filter((e) =>
            accent(e.nome.toLowerCase()).startsWith(q.toLowerCase())
          )
          .splice(0, 10)
      : municipios;

    return response.json(filtered);
  },
};
