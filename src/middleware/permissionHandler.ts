import { AppError } from '../utils';
import { RES_TYPES, ErrorType } from '../constant';

export default function permit(roles) {
    return function (req, res, next) {
        if (roles.includes(req.user.role)) {
            return next();
        }
        throw new AppError(RES_TYPES.NOT_PERMISSION, ErrorType.FORBIDDEN);
    };
}