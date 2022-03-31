export default {
  insert: ({ municipio, data, item }) =>
    `insert into dbo.historico_localizacao (municipio,data_acesso, item_pesquisado) values ('${municipio}', '${data}', '${item}')`,
  select: () => `select * from dbo.historico_localizacao`,
};

// ({ municipio, data, item }) => {
//   return {
//     insert: `insert into dbo.historico_localizacao (municipio,data_acesso, item_pesquisado) values ('${municipio}', '${data}', '${item}')`,
//     select: `select * from dbo.historico_localizacao`,
//   };
// };
