import { getCities } from '../../util/getCitiesByDistance.js';

// function handleQuote(value) {
//   if (!value) return null;
//   const re = /[\"|\'](?<description>.+)[\"|\']/gim;
//   const result = re.exec(value);
//   return result ? result.groups.description : value.trim().replaceAll(' ', '%');
// }
function handleQuote(value) {
  if (!value) return null;
  return value.replaceAll("'", '"');
}

function captureQuote(value) {
  const re = /^\"(.*)\"$/gim;
  if (!re.test(value)) {
    return value.split(' ').join(' and ');
  } else {
    return value;
  }
}

export default (query) => {
  const parse = (value) => value && JSON.parse(value);

  const cidade = query.cidade?.split(',')[0].toUpperCase().trim() || '';
  const descricao = captureQuote(handleQuote(query.descricaoFilter));

  const municipio = query.cidadeFilter;
  const orgao = query.orgaoFilter;
  const microrregiao = query.microrregiaoFilter;
  const distancia = getCities(cidade, query.distanciaFilter);
  const valorMinimo = parse(query.faixaPrecoFilter)?.minimo;
  let valorMaximo = parse(query.faixaPrecoFilter)?.maximo;
  const dataInicio = parse(query.periodoHomologacaoFilter)?.begin;
  const dataFim = parse(query.periodoHomologacaoFilter)?.end;
  const esfera = null;
  // const esfera = parse(query.esferaFilter);
  let { page, limit, sort, order } = query;

  let referencePrice = query.referencePrice;
  //console.log('referencePrice', referencePrice);

  const maxValue = parse(query.valuesAmplitude)?.max;
  const minValue = parse(query.valuesAmplitude)?.min;
  const avgValue = parse(query.valuesAmplitude)?.avg;

  // console.log(page);
  // console.log(query);

  // console.log('max', maxValue);
  // console.log('min', minValue);
  // console.log('calc max', maxValue - (maxValue - minValue) * 0.3);
  // console.log('calc min', minValue + (maxValue - minValue) * 0.3);

  function getReferencePrice() {
    const reference = {
      min: `and i.VALOR_UNITARIO < ${minValue + (maxValue - minValue) * 0.3}`,
      max: `and i.VALOR_UNITARIO > ${maxValue - (maxValue - minValue) * 0.3}`,
      avg: `and i.VALOR_UNITARIO between ${
        minValue + (maxValue - minValue) * 0.15
      } and ${maxValue - (maxValue - minValue) * 0.15}`,
    };
    return reference[referencePrice] || '';
  }

  function getString(column = 'lic.DATA_HOMOLOGACAO') {
    // console.log('column', column);
    let begin,
      end = null;
    if (column == 'i.VALOR_UNITARIO') {
      if (parseFloat(valorMaximo) < parseFloat(valorMinimo))
        valorMaximo = valorMinimo;
      begin = valorMinimo ? valorMinimo.replace(',', '.') : null;
      end = valorMaximo ? valorMaximo.replace(',', '.') : null;
    } else {
      begin = dataInicio && `convert(date,'${dataInicio}',103)`;
      end = dataFim && `convert(date,'${dataFim}',103)`;
    }

    if (end) {
      return begin
        ? `and ${column} between ${begin} and ${end}`
        : `and ${column} <=  ${end}`;
    } else {
      return begin ? `and ${column} >=  ${begin}` : '';
    }
  }

  return `
      --declare @id_lic_finalizada int =  516907
      --declare @Qtd_lic_finalizada int
      --Select @Qtd_lic_finalizada = (Select count(*) From licitacoesweb.licitacao Where ID_STATUS_LICITACAO = 3)
      DECLARE @limit INT = ${limit || 20},
              @page  INT = ${page || 1};
  
      select 
             --@Qtd_lic_finalizada Qtd_lic_finalizada, 
              lic.id id_tce,
              ug.nm_nome orgao,
              lic.NUMERO_PROCESSO_TCE,
              lic.DATA_ABERTURA data_abertura,
              lic.DATA_HOMOLOGACAO data_homologacao,
              mun.NM_NOME municipio,
              i.DESCRICAO descricao, 
              lte.NOME nome, 
              IsNULL(lte.cnpj, lte.cpf) doc,
              i.QUANTIDADE quantidade, 
              IsNULL(i.VALOR_UNITARIO,0) valor
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
           ${esfera ? `and ug.id_esfera in (${esfera.join()})` : ''}
           ${municipio ? `and mun.ID_MUNICIPIO = ${municipio}` : ''}
           ${getString('i.VALOR_UNITARIO')}
           ${distancia ? `and mun.ID_MUNICIPIO in ( ${distancia} )` : ''}
           ${getString('lic.DATA_HOMOLOGACAO')}
           ${getReferencePrice()}
  
           ORDER BY ${sort || 'i.DESCRICAO'} ${order || 'asc'}
           OFFSET (@page - 1) * @limit ROWS
           FETCH NEXT @limit ROWS ONLY;
  `;
};
