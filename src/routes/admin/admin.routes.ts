import BaseRoute from '../base.routes';
import { adminControllers } from '../../controller';

class adminRoute extends BaseRoute {
    initializeRoutes() {
        this.router.get('/', adminControllers.getAdmin);
    }
}
export default new adminRoute().router;
