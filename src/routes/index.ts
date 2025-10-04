import express, { Router } from 'express';
// import permit from '../middleware/permissionHandler';
import { END_POINTS, ErrorType, RES_TYPES } from '../constant';
import { AppError } from '../utils'
import authRoutes from './auth/auth.routes';
import userRoutes from './user/user.routes';
import adminRoutes from './admin/admin.routes';

class InvalidedRouter {
    handleRequest(req, res, next) {
        return  next(new AppError(`${req.url} - ${RES_TYPES.BAD_URL}`, ErrorType.NOT_FOUND));
    }
}

class MainRouter  {
    router: Router
    invalidedRouter: InvalidedRouter;
    constructor() {
        this.router = express.Router();
        this.invalidedRouter = new InvalidedRouter();
    }

    setupRoutes() {
        this.router.use(END_POINTS.AUTH, authRoutes);
        this.router.use(END_POINTS.USER, userRoutes);
        this.router.use(END_POINTS.ADMIN, adminRoutes);
        this.router.all('*', (req, res, next) => this.invalidedRouter.handleRequest(req, res, next));
    }
}

const mainRouter = new MainRouter();
mainRouter.setupRoutes();

export default mainRouter.router;