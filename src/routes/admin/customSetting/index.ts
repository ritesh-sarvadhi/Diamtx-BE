import { Router } from 'express';

import customSettingRoutes from './customSetting.routes';

const router = Router();

router.use('/', customSettingRoutes);

export default router;
