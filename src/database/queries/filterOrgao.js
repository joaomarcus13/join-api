export default ({ cidade }) => {
  return `select id, dbo.ajeita(nm_nome) nm_nome from Jurisdicionado.dbo.CRP_UNIDADEGESTORA  ${
    cidade ? `where id_municipio = ${cidade}` : ''
  } `;
};
