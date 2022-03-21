export default ({ cidade }) => {
  return `select id,nm_nome from Jurisdicionado.dbo.CRP_UNIDADEGESTORA ${
    cidade ? `where id_municipio = ${cidade}` : ''
  } `;
};
