import { Router } from 'express';

import { MasterController } from '../../../controller/master';

const masterRouter = Router();
const controller = new MasterController();

masterRouter.get('/', controller.list.bind(controller));
masterRouter.post('/', controller.list.bind(controller));
masterRouter.get('/:id', controller.subMasterList.bind(controller));
masterRouter.put('/:id', controller.updateStatus.bind(controller));

export default masterRouter;
