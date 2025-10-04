import { Router } from 'express';

import adminRoutes from './admin';
import userRoutes from './user';
import appError from '../utils/errorHelper';
import { ErrorType } from '../utils/errorTypes';

class MainRouter {
  router: Router;

  constructor() {
    this.router = Router();
  }

  setupRoutes() {
    this.router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to SARVADHI world!!' }));
    this.router.use('/api/v1/admin', adminRoutes);
    this.router.use('/api/v1/user', userRoutes);

    this.router.all('*', (req, res, next) => {
      next(new appError('path not found', ErrorType.not_found));
    });
  }
}

const mainRouter = new MainRouter();
mainRouter.setupRoutes();

export default mainRouter.router;
