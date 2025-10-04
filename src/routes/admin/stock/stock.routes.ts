import { Router } from 'express';
import { StockController } from '../../../controller/stock';
import { verifyJWT_MW } from '../../../config/middlewares';
import { createStockSchema, updateStockSchema, updateStatusSchema } from '../../../validation/stock.validation';

const stockRouter = Router();
const controller = new StockController();

// Apply authentication middleware to all routes
stockRouter.use(verifyJWT_MW);

// Stock routes
stockRouter.get('/', controller.list.bind(controller));
stockRouter.get('/stats', controller.getStockStats.bind(controller));
stockRouter.get('/:id', controller.getById.bind(controller));
stockRouter.post('/', createStockSchema, controller.create.bind(controller));
stockRouter.put('/:id', updateStockSchema, controller.update.bind(controller));
stockRouter.delete('/:id', controller.delete.bind(controller));
stockRouter.patch('/:id/status', updateStatusSchema, controller.updateStatus.bind(controller));

export default stockRouter;
