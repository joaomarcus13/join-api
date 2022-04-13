import queryItens from '../database/queries/itens.js';
import db from '../database/request.js';
import format from '../util/formatValues.js';

const mock = {
  itens: [
    {
      descricao:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod ex consequatur odit quis. Eligendi doloribus corporis perspiciatis suscipit, minus odit tenetur ex sed quasi perferendis, debitis autem nulla error culpa.',
      valor: 'R$ 122.000.000,00',
      municipio: 'São Paulo',
      orgao: 'Prefeitura de São Paulo',
      data_homologacao: '01/01/2020',
      nome: 'João da Silva lsgfmgregn nmgrkegnmer ',
      doc: '123.456.789-10',
      NUMERO_PROCESSO_TCE: 'TC/1234/2019',
      id_tce: '1',
    },
    {
      descricao: 'Lorem ipsum dolor sit amet ',
      valor: 'R$ 1.000,00',
      municipio: 'São Paulo',
      orgao: 'Prefeitura de São Paulo de minas e energia ltda',
      data_homologacao: '01/01/2020',
      nome: 'João da Silva',
      doc: '123.456.789-10',
      NUMERO_PROCESSO_TCE: 'TC/1234/2019',
    },
    {
      descricao:
        'Lorem ipsum dolor sit amet perspiciatis suscipit, minus odit tenetur ex sed quasi perferendis, debitis autem nulla error culpa.',
      valor: 'R$ 1.000,00',
      municipio: 'São Paulo',
      orgao: 'Prefeitura de São Paulo',
      data_homologacao: '01/01/2020',
      nome: 'João da Silva',
      doc: '123.456.789-10',
      NUMERO_PROCESSO_TCE: 'TC/1234/2019',
    },
    {
      descricao:
        'Lorem ipsum dolor sit amet perspiciatis suscipit, minus odit tenetur ex sed quasi perferendis, debitis autem nulla error culpa.',
      valor: 'R$ 1.000,00',
      municipio: 'São Paulo',
      orgao: 'Prefeitura de São Paulo',
      data_homologacao: '01/01/2020',
      nome: 'João da Silva',
      doc: '123.456.789-10',
      NUMERO_PROCESSO_TCE: 'TC/1234/2019',
    },
    {
      descricao:
        'Lorem ipsum dolor sit amet perspiciatis suscipit, minus odit tenetur ex sed quasi perferendis, debitis autem nulla error culpa.',
      valor: 'R$ 1.000,00',
      municipio: 'São Paulo',
      orgao: 'Prefeitura de São Paulo',
      data_homologacao: '01/01/2020',
      nome: 'João da Silva',
      doc: '123.456.789-10',
      NUMERO_PROCESSO_TCE: 'TC/1234/2019',
    },
    {
      descricao:
        'Lorem ipsum dolor sit amet perspiciatis suscipit, minus odit tenetur ex sed quasi perferendis, debitis autem nulla error culpa.',
      valor: 'R$ 1.000,00',
      municipio: 'São Paulo',
      orgao: 'Prefeitura de São Paulo',
      data_homologacao: '01/01/2020',
      nome: 'João da Silva',
      doc: '123.456.789-10',
      NUMERO_PROCESSO_TCE: 'TC/1234/2019',
    },
  ],
  count: 10,
};

export default {
  async index(request, response) {
    const queryString = queryItens(request.query);
    // console.log(queryString);
    // return response.json(mock);
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
