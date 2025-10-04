import { Request, Response, NextFunction } from 'express';
import { QueryTypes } from 'sequelize';

import db from '../../models';
import { sequelize } from '../../config/sequelize';
import { logger } from '../../logger/Logger';

const ALLOWED_UPDATE_FIELDS = new Set([
  'isActive',
  'column',
  'showHeader',
  'showTotal',
  'showRowNo',
  'showFilter',
  'isRowFreeze',
  'withData',
  'fileType',
]);

export class CustomSettingController {
  private customSettingModel = db['CustomSetting'];

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body ?? {};
      const record = await this.customSettingModel.create(payload);

      return res.status(201).json({
        success: true,
        message: 'Custom setting created successfully.',
        data: record,
      });
    } catch (error) {
      logger.error('Failed to create custom setting', { error });
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await sequelize.query(
        `
          SELECT 
            cs.*, 
            acc."name" AS "partyName"
          FROM "CustomSetting" cs
          LEFT JOIN "Account" acc ON acc.id = cs."partyId"
          ORDER BY cs."createdAt" DESC
        `,
        { type: QueryTypes.SELECT }
      );

      return res.status(200).json({
        success: true,
        message: 'Custom settings fetched successfully.',
        data,
      });
    } catch (error) {
      logger.error('Failed to fetch custom settings', { error });
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid custom setting id provided.',
        });
      }

      const setting = await this.customSettingModel.findByPk(id);
      if (!setting) {
        return res.status(404).json({
          success: false,
          message: 'Custom setting not found.',
        });
      }

      const payload = req.body ?? {};
      const updatePayload: Record<string, unknown> = {};

      Object.keys(payload).forEach(key => {
        if (ALLOWED_UPDATE_FIELDS.has(key)) {
          updatePayload[key] = payload[key];
        }
      });

      if (Object.keys(updatePayload).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No allowed fields provided for update.',
        });
      }

      await setting.update(updatePayload);
      const refreshed = await setting.reload();

      return res.status(200).json({
        success: true,
        message: 'Custom setting updated successfully.',
        data: refreshed,
      });
    } catch (error) {
      logger.error('Failed to update custom setting', { error });
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid custom setting id provided.',
        });
      }

      const setting = await this.customSettingModel.findByPk(id);
      if (!setting) {
        return res.status(404).json({
          success: false,
          message: 'Custom setting not found.',
        });
      }

      await setting.destroy();

      return res.status(200).json({
        success: true,
        message: 'Custom setting deleted successfully.',
      });
    } catch (error) {
      logger.error('Failed to delete custom setting', { error });
      next(error);
    }
  }
}

export default CustomSettingController;
