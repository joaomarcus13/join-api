import { Router } from 'express';
import ItensController from './controllers/ItensController.js';
import FilterOrgaoController from './controllers/FilterOrgaoController.js';
import InfoLicitacoesController from './controllers/InfoLicitacoesController.js';
import ValuesPriceController from './controllers/ValuesPriceController.js';

const routes = Router();

routes.get('/itens', ItensController.index);
routes.get('/filter/orgao', FilterOrgaoController.index);
routes.get('/licitacoes/info', InfoLicitacoesController.index);
routes.get('/price', ValuesPriceController.index);

export default routes;
