import { Router } from 'express';
import { verifyCache } from './middleware/verifyCache.js';
import ItensController from './controllers/ItensController.js';
import FilterOrgaoController from './controllers/FilterOrgaoController.js';
import InfoLicitacoesController from './controllers/InfoLicitacoesController.js';
import ValuesPriceController from './controllers/ValuesPriceController.js';
import MunicipiosController from './controllers/MunicipiosController.js';
import HistoricoController from './controllers/HistoricoController.js';

const routes = Router();

routes.get('/itens', ItensController.index);
routes.get('/orgaos', FilterOrgaoController.index);
routes.get('/licitacoes/info', InfoLicitacoesController.index);
routes.get('/valores', ValuesPriceController.index);
routes.get('/municipios', MunicipiosController.index);

routes.get('/historico', HistoricoController.index);
routes.post('/historico', HistoricoController.store);

export default routes;
