import { getCities } from '../../util/getCitiesByDistance.js';
import { handleQuote, prepareText } from '../../util/formatValues.js';

export default (query) => {
  const cidade = query.cidade?.split(',')[0].toUpperCase().trim() || '';
  const descricao = prepareText(handleQuote(query.descricaoFilter?.trim()));

  const municipio = query.cidadeFilter;
  const orgao = query.orgaoFilter;
  const microrregiao = query.microrregiaoFilter;
  const distancia = getCities(cidade, query.distanciaFilter);
  const dataInicio = query.inicio;
  const dataFim = query.fim;

  function getString(column) {
    let begin,
      end = null;
    begin = dataInicio && `convert(date,'${dataInicio}',103)`;
    end = dataFim && `convert(date,'${dataFim}',103)`;

    if (end) {
      return begin
        ? `and ${column} between ${begin} and ${end}`
        : `and ${column} <=  ${end}`;
    } else {
      return begin ? `and ${column} >=  ${begin}` : '';
    }
  }

  return `
        select 
        distinct
        MAX(i.VALOR_UNITARIO) over (order by getdate())  [max],
        MIN(i.VALOR_UNITARIO) over (order by getdate()) [min]
        --avg(i.VALOR_UNITARIO) over (order by getdate()) [avg]
        from licitacoesweb.item i 
             inner join licitacoesweb.lote lo on lo.id = i.ID_LOTE 
             inner join licitacoesweb.PARTICIPACAO p on p.id = lo.ID_PARTICIPACAO 
             inner join licitacoesweb.licitacao lic on lic.id = p.ID_LICITACAO 
             inner join licitacoesweb.licitante lte on lte.id = p.ID_LICITANTE
             inner join licitacoesweb.TIPO_STATUS_LICITACAO tsl on tsl.id = lic.ID_STATUS_LICITACAO 
             inner join Jurisdicionado.dbo.crp_unidadeGestora ug on ug.id = lic.ID_UNIDADE_GESTORA 
             inner join Jurisdicionado.dbo.CRP_MUNICIPIO mun on mun.ID_MUNICIPIO = ug.ID_MUNICIPIO
    
             --where lic.id = @id_lic_finalizada 
             where tsl.nome = 'Finalizada' -- 
             ${descricao ? `and contains(i.descricao,'${descricao}')` : ''}
             ${microrregiao ? `and mun.ID_MICROREGIAO = ${microrregiao}` : ''}
             ${orgao ? `and ug.id = ${orgao}` : ''}
             ${municipio ? `and mun.ID_MUNICIPIO = ${municipio}` : ''}
             ${distancia ? `and mun.ID_MUNICIPIO in ( ${distancia} )` : ''}
             ${getString('lic.DATA_HOMOLOGACAO')}

    `;
};
