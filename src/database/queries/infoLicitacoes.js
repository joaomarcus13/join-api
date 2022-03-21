export default `
select count(distinct lic.ID) quantidade_licitacoes, 
count(i.ID) quantidade_itens, 
sum(lic.VALOR_TOTAL_HOMOLOGADO) valor_total
--,sum(i.VALOR_UNITARIO*i.QUANTIDADE)
from
licitacoesweb.LICITACAO lic 
left join licitacoesweb.lote lo on lo.ID_LICITACAO = lic.ID
left join licitacoesweb.item i on i.ID_LOTE = lo.id 
where lic.ID_STATUS_LICITACAO=3
`;
