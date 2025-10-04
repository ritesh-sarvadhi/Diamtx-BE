import { Router } from 'express';

import masterRoutes from './master.routes';

const router = Router();

router.use('/', masterRoutes);

export default router;
