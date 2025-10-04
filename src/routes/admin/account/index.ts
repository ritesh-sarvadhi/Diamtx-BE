import { Router } from 'express';

import accountRoutes from './account.routes';

const router = Router();

router.use('/', accountRoutes);

export default router;
