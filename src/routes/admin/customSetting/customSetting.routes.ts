import { Router } from 'express';

import { CustomSettingController } from '../../../controller/customSetting';

const router = Router();
const controller = new CustomSettingController();

router.post('/', controller.create.bind(controller));
router.get('/', controller.list.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.remove.bind(controller));

export default router;
