import { db } from '../../model';
import * as jwt from 'jsonwebtoken';
import { RES_TYPES } from '../../constant';
import { AppError } from '../../utils';

export class authController{
    
    async login(req, res, next) {
        const { body: { email, password } } = req;
        const result = await db.userModel.findOne({ where: { email } });

        if (result && result.authenticate(password)) {
            const payload = {
                id: result.id,
                Email: result.email
            };
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXP, algorithm: 'HS256' }
            )
            return res.status(200).json({
                success: true,
                data: token,
                message: RES_TYPES.LOGIN
            });
        } else {
            return next(new AppError(RES_TYPES.AUTH_FAIL, 'unauthorized'));
        }
    }

}