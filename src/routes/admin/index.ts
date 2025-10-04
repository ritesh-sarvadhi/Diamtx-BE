import { Router } from 'express';

import accountRoutes from './account';
import masterRoutes from './master';
import { stockRoutes } from './stock';

const router = Router();

router.get('/', (req, res) => res.status(200).send({ message: 'Admin Server is running!' }));
router.use('/master', masterRoutes);
router.use('/accounts', accountRoutes);
router.use('/stocks', stockRoutes);

export default router;
