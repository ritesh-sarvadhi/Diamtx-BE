import express, { Express } from 'express';
import { logger } from './logger/logger';
import { ErrorHandler } from './middleware/errorHandler';
import passport from 'passport';
import './config/authentication';
import routes from './routes';

const port = process.env.PORT || 9500;

class AppServer {
    constructor() {
        const app: Express = express();
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        app.use(passport.initialize());
        app.use('/api/v1',routes);
        app.use(ErrorHandler);
        app.listen(port, () => {
            logger.info(`🚀 Server is listening on Port:- ${port}`);
        });
    }
}
new AppServer();
