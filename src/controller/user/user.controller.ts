import { db } from '../../model';
import { ApplicationController } from '../application.controller';

class userRegistrarController extends ApplicationController {
    constructor() {
        super(db.userModel);
    }
}
export const userController = new userRegistrarController();