import { logger } from '../logger/logger';
import { ErrorType } from '../constant';
import { Response, Request, NextFunction } from 'express';

function GenerateCustomError(err: any, statusCode: number, res: Response) {
    const ErrorObj = { statusCode, message: err.message };
    return res.status(statusCode).send(ErrorObj);
}

export function ErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    if (err.ErrorName === undefined) {

        switch (err instanceof Error) {
            case err.name === 'SequelizeValidationError':
                logger.error(`${err.message}`);
                return GenerateCustomError(err.errors[0], 400, res);

            case err.name === 'SequelizeUniqueConstraintError':
                logger.error(`${err.message}`);
                return GenerateCustomError(err.errors[0], 409, res);

            case err.name === 'SequelizeForeignKeyConstraintError':
                logger.error(`${err.message}`);
                return GenerateCustomError(err, 400, res);

            default:
                logger.error(`${err.message}`);
                GenerateCustomError(err, 500, res);
                break;
        }

    } else {

        switch (err.ErrorName) {
            case ErrorType.FORBIDDEN:
                logger.error(`${err.message}`);
                GenerateCustomError(err, 403, res);
                break;

            case ErrorType.CONFLICT:
                logger.error(`${err.message}`);
                GenerateCustomError(err, 409, res);
                break;

            case ErrorType.INVALID_REQUEST:
                logger.error(`${err.message}`);
                GenerateCustomError(err, 400, res);
                break;

            case ErrorType.NOT_FOUND:
                logger.error(`${err.message}`);
                GenerateCustomError(err, 404, res);
                break;

            case ErrorType.UNAUTHORIZED:
                logger.error(`${err.message}`);
                GenerateCustomError(err, 401, res);
                break;

            case ErrorType.VALIDATION_ERROR:
                logger.error(`${err.message}`);
                GenerateCustomError(err, 400, res);
                break;

            default:
                logger.error(`${err.message}`);
                GenerateCustomError(err, 500, res);
                break;
        }
    }
}

