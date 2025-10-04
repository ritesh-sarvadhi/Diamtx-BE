import BaseRoute from '../base.routes';
import { userController } from '../../controller';
import passport from 'passport';
import { userValidation } from '../../validation/comman.Validation';

class userRoute extends BaseRoute {
    initializeRoutes() {
        this.router.post('/', userValidation, userController.create.bind(userController));
        this.router.delete(
            '/:id',
            passport.authenticate('jwt', { session: false }),
            userController.delete.bind(userController)); 
        this.router.put(
            '/:id',
            passport.authenticate('jwt', { session: false }),
            userValidation, 
            userController.update.bind(userController));
    }
}
export default new userRoute().router;
