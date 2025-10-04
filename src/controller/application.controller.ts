import { AppError } from '../utils';
import { RES_TYPES } from '../constant';
import { Request, Response, NextFunction } from 'express';

export class ApplicationController {
    model: any;
    constructor(model: any) {
        this.model = model;
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const Data = await this.model.create(req.body);
            return res.status(201).json(
                { success: true, StatusCode: 201, data: Data, message: RES_TYPES.CREATE }
            );
        } catch (err) {
            return next(err);
        }

    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.model.update(req.body, { where: { id } });
            return res.json(
                { success: true, StatusCode: 200, message: RES_TYPES.UPDATE }
            );
        } catch (err) {
            return next(err);
        }

    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const deleted = await this.model.destroy({ where: { id } });
            if (deleted) {
                return res.json(
                    { success: true, statusCode: 200, data: deleted, message: RES_TYPES.DELETE }
                );
            } else {
                return next(new AppError(RES_TYPES.ID_NOT_FOUND, 'not_found'));
            }
        } catch (err) {
            return next(err);
        }

    }

    async getData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.model.findAll();
            if (data) {
                return res.status(200).json({ success: false, data, message: RES_TYPES.FETCH });
            }
        } catch (err) {
            return next(err);
        }

    }
}