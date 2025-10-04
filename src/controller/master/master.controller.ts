import { Request, Response } from 'express';
import { logger } from '../../logger/Logger';
import db from '../../models';

export class MasterController {

  async list(req: Request, res: Response, next) {
    try {
      const masters = await db['Master'].findAll({
        where: {
          parentId: null,
        }
      });
      return res.status(200).json({
        success: true,
        message: 'Master list fetched successfully.',
        data: masters,
      });
    } catch (error) {
      logger.error('Failed to list master', { error });
      next(error);
    }
  }

  async subMasterList(req: Request, res: Response, next) {
    try {
      const parentId = Number(req.params.id);
      const masters = await db['Master'].findAll({
        where: {
          parentId: parentId,
        }
      });

      return res.status(200).json({
        success: true,
        message: 'Sub master list fetched successfully.',
        data: masters,
      });
    } catch (error) {
      logger.error('Failed to list sub master', { error });
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const masterId = Number(req.params.id);
      if (Number.isNaN(masterId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid master id provided.',
        });
      }

      // Use the ApplicationController's model access pattern
      const master = await db['Master'].findByPk(masterId);
      if (!master) {
        return res.status(404).json({
          success: false,
          message: 'Master not found.',
        });
      }

      const { isActive, isWebDisplay } = req.body ?? {};
      const updates: Record<string, boolean> = {};

      if (typeof isActive === 'boolean') {
        updates.isActive = isActive;
      }

      if (typeof isWebDisplay === 'boolean') {
        updates.isWebDisplay = isWebDisplay;
      }

      if (Object.keys(updates).length === 0) {
        updates.isActive = !master.get('isActive');
        updates.isWebDisplay = !master.get('isWebDisplay');
      }

      await master.update(updates);
      const refreshed = await master.reload();

      return res.status(200).json({
        success: true,
        message: 'Master status updated successfully.',
        data: refreshed,
      });
    } catch (error) {
      logger.error('Failed to update master status', { error });
      return res.status(500).json({
        success: false,
        message: 'Unable to update master status.',
      });
    }
  }
}
