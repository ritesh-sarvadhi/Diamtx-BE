import { Router } from 'express';

import accountRoutes from './account';
import masterRoutes from './master';
import { stockRoutes } from './stock';
import customSettingRoutes from './customSetting';

const router = Router();

router.get('/', (req, res) => res.status(200).send({ message: 'Admin Server is running!' }));
router.use('/master', masterRoutes);
router.use('/accounts', accountRoutes);
router.use('/stocks', stockRoutes);
router.use('/custom-settings', customSettingRoutes);

export default router;
