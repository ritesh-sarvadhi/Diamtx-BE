import BaseRoute from '../base.routes';
import { authController } from '../../controller';
import { loginValidation } from '../../validation/comman.Validation';
import { END_POINTS } from '../../constant';

const auth = new authController();

class authRoutes extends BaseRoute {
    initializeRoutes() {
        this.router.get(END_POINTS.LOGIN, loginValidation, auth.login);
    }
}
export default new authRoutes().router;
