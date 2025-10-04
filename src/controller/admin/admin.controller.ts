import { db } from '../../model';
import { ApplicationController } from '../application.controller';

class adminController extends ApplicationController {
    constructor() {
        super(db.userModel);
    }
    async getAdmin(req,res,next){
        try {
            return res.send('get admin Routes')
        } catch (err) {
            next(err)
        }
    }
}
export const adminControllers = new adminController();