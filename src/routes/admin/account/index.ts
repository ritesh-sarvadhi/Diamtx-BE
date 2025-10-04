import { Router } from 'express';

import accountRoutes from './account.routes';
import termRoutes from './term.routes';

const router = Router();

router.use('/', accountRoutes);
router.use('/terms', termRoutes);

export default router;
