import express from 'express';
import { AppError } from '../utils';
class BaseRoute {
    router: any;
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        throw new AppError('Subclasses must implement initializeRoutes method.','not_found');
    }
}
export default BaseRoute;
