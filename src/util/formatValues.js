export const handleQuote = (value) => {
  if (!value) return null;
  return value.replace(/^[\'\"](.*)[\'\"]$/gim, '"$1"');
};

export const prepareText = (value) => {
  if (value) {
    const re = /^\"(.*)\"$/gim;
    const text = removeSpace(removeCaracters(accent(value))).trim();
    if (!re.test(value)) {
      return text.split(' ').join(' and ');
    } else {
      return text;
    }
  }
};

export const capitalize = (arr) => {
  arr.forEach((obj) => {
    obj.nm_nome = initCap(obj.nm_nome);
  });
};

const removeSpace = (text) => {
  if (text) {
    return text.replaceAll(/(\r\n|\n|\r|\t+|\s+)/gm, ' ');
  }
};

const removeCaracters = (text) => {
  if (text) {
    return text.replaceAll(/[^a-z0-9\"\']/gim, ' ');
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

export const formatDescription = (value) => {
  if (value) {
    return removeSpace(value).trim();
  }
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
      descricao: formatDescription(obj.descricao),
      municipio: obj.municipio.toUpperCase(),
    };
  });
}
