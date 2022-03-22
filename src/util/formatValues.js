export const capitalize = (arr) => {
  arr.forEach((obj) => {
    obj.nm_nome = initCap(obj.nm_nome);
  });
};

const initCap = (text) => {
  let list = text.replaceAll(/(\r\n|\n|\r|\t+|\s+)/gm, ' ').split(' ');
  for (let i = 0; i < list.length; i++) {
    list[i] =
      list[i].length <= 2
        ? list[i].toLowerCase()
        : list[i].charAt(0) + list[i].slice(1).toLowerCase();
  }
  return list.join(' ');
};

const formatCurrency = (value) => {
  if (value) {
    return Number(value).toLocaleString('pt-bt', {
      style: 'currency',
      currency: 'BRL',
    });
  }
};

export const formatInfo = (obj) => {
  return {
    valor_total: formatCurrency(obj.valor_total),
    quantidade_licitacoes: obj.quantidade_licitacoes.toLocaleString(),
    quantidade_itens: obj.quantidade_itens.toLocaleString(),
  };
};

const formatDoc = (value) => {
  if (value) {
    if (value.length == 14)
      return value.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );

    return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
};

const formatDate = (value) => {
  if (value) return value.toLocaleDateString('pt-br');
};

const formatDescription = (value) => {
  if (value) {
    return value.replaceAll(/(\r\n|\n|\r|\t+|\s+)/gm, ' ').trim();
  }
};

const captureQuote = (value) => {
  const re = /[\"|\'](?<description>.+)[\"|\']/gim;
  const result = re.exec(value.replaceAll(/\s{2,}/gim, ' '));
  return result
    ? result.groups.description
    : value
        .trim()
        .replaceAll(/[\"|\']/g, '')
        .replaceAll(' ', '\\b.*\\b');
};

export const accent = (text) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const isValid = (descricao, descricaoFilter) => {
  if (!descricaoFilter) return true;
  descricaoFilter = accent(captureQuote(descricaoFilter));
  descricao = accent(descricao);
  let regex = new RegExp(
    `\\b\\d*\\w{0,1}(${descricaoFilter})\\w{0,2}\\d*\\b`,
    'gim'
  );
  return regex.test(descricao);
};

export default function format(arr, descricaoFilter) {
  return arr
    .map((obj) => {
      if (isValid(obj.descricao, descricaoFilter))
        return {
          ...obj,
          valor: formatCurrency(obj.valor),
          doc: formatDoc(obj.doc),
          data_homologacao: formatDate(obj.data_homologacao),
          descricao: formatDescription(obj.descricao),
          municipio: obj.municipio.toUpperCase(),
        };
      return null;
    })
    .filter((e) => e !== null);
}
