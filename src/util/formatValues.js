export const handleQuote = (value) => {
  if (!value) return null;
  return value.replace(/^[\'\"](.*)[\'\"]$/gim, '"$1"');
};

export const prepareText = (value) => {
  const captureNot = (text) => {
    return text.replaceAll(/-((?:[\"\'])?[a-z0-9]+(?:[\"\'])?)/gim, 'not $1');
  };
  if (value) {
    const text = removeSpace(removeCaracters(accent(value)));
    const re = /(-?[\"\'][a-z0-9\s+]+[\"\']|[-a-z0-9]+)/gim;
    const terms = text.match(re);
    terms[0] = terms[0].replace('-', '');
    return terms.reduce((acc, next) => (acc += ` and ${captureNot(next)}`));
  }
};

export const capitalize = (arr) => {
  arr.forEach((obj) => {
    obj.nm_nome = initCap(obj.nm_nome);
  });
};

const removeSpace = (text) => {
  if (text) {
    return text.replaceAll(/(\r\n|\n|\r|\t+|\s+)/gm, ' ').trim();
  }
};

const removeCaracters = (text) => {
  if (text) {
    return text.replaceAll(/[^a-z0-9\"\'-]/gim, ' ');
  }
};

const initCap = (text) => {
  let list = removeSpace(text).split(' ');
  for (let i = 0; i < list.length; i++) {
    list[i] =
      list[i].length <= 2
        ? list[i].toLowerCase()
        : list[i].charAt(0) + list[i].slice(1).toLowerCase();
  }
  return list.join(' ');
};

export const splitCity = (text) => {
  return text ? text.split(',')[0].toUpperCase().trim() : '';
};

export const parse = (value) => {
  try {
    return JSON.parse(value);
  } catch (_) {
    return null;
  }
};

export const formatCurrency = (value) => {
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

export const formatDoc = (value) => {
  if (value) {
    if (value.length == 14)
      return value.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );

    return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
};

export const formatDate = (value) => {
  if (value) return value.toLocaleDateString('pt-br');
};

export const accent = (text) =>
  text && text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default function format(arr) {
  return arr.map((obj) => {
    return {
      ...obj,
      valor: formatCurrency(obj.valor),
      doc: formatDoc(obj.doc),
      data_homologacao: formatDate(obj.data_homologacao),
      descricao: removeSpace(obj.descricao),
      municipio: obj.municipio.toUpperCase(),
    };
  });
}
