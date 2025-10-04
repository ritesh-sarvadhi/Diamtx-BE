import { Router } from 'express';

import { TermDetailController } from '../../../controller/account';

const termRouter = Router({ mergeParams: true });
const controller = new TermDetailController();

termRouter.post('/', controller.create.bind(controller));
termRouter.get('/:accountId', controller.list.bind(controller));
termRouter.put('/:termId', controller.update.bind(controller));
termRouter.delete('/:termId', controller.remove.bind(controller));
termRouter.post('/approve', controller.approve.bind(controller));

export default termRouter;
