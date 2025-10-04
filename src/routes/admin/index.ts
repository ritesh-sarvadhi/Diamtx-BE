import { Router } from 'express';

import accountRoutes from './account';
import masterRoutes from './master';

const router = Router();

router.get('/', (req, res) => res.status(200).send({ message: 'Admin Server is running!' }));
router.use('/master', masterRoutes);
router.use('/accounts', accountRoutes);

export default router;
