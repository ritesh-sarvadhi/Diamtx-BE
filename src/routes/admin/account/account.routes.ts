import { Router } from 'express';

import { AccountController } from '../../../controller/account';

const accountRouter = Router();
const controller = new AccountController();

accountRouter.post('/', controller.create.bind(controller));
accountRouter.get('/active', controller.listActive.bind(controller));
accountRouter.put('/:id', controller.update.bind(controller));
accountRouter.delete('/:id', controller.remove.bind(controller));
accountRouter.post('/filter/categories', controller.listByCategories.bind(controller));

export default accountRouter;
