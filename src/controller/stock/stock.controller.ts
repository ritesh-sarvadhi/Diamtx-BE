import { Response, NextFunction } from 'express';
import { logger } from '../../logger/Logger';
import db from '../../models';
import { Op } from 'sequelize';

export class StockController {

  async list(req: any, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, search, status, accountId, locationId } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      const whereClause: any = {
        isDelete: false
      };

      if (status !== undefined) {
        whereClause.status = status;
      }

      if (accountId) {
        whereClause.accountId = accountId;
      }

      if (locationId) {
        whereClause.locationId = locationId;
      }

      if (search) {
        whereClause[Op.or] = [
          { lotNo: { [Op.iLike]: `%${search}%` }},
          { certificateNo: { [Op.iLike]: `%${search}%` }},
          { packetNo: { [Op.iLike]: `%${search}%` }},
          { roughNo: { [Op.iLike]: `%${search}%` }},
          { inscription: { [Op.iLike]: `%${search}%` }}
        ];
      }

      const stocks = await db['Stock'].findAndCountAll({
        where: whereClause,
        include: [
          {
            model: db['User'],
            as: 'createdByData',
            attributes: [ 'id', 'name', 'email' ]
          },
          {
            model: db['User'],
            as: 'updatedByData',
            attributes: [ 'id', 'name', 'email' ]
          }
        ],
        order: [[ 'createdAt', 'DESC' ]],
        limit: Number(limit),
        offset: offset
      });

      return res.status(200).json({
        success: true,
        message: 'Stock list fetched successfully.',
        data: {
          stocks: stocks.rows,
          pagination: {
            currentPage: Number(page),
            totalPages: Math.ceil(stocks.count / Number(limit)),
            totalItems: stocks.count,
            itemsPerPage: Number(limit)
          }
        }
      });
    } catch (error) {
      logger.error('Failed to list stocks', { error });
      next(error);
    }
  }

  async getById(req: any, res: Response, next: NextFunction) {
    try {
      const stockId = Number(req.params.id);
      if (Number.isNaN(stockId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid stock id provided.',
        });
      }

      const stock = await db['Stock'].findOne({
        where: {
          id: stockId,
          isDelete: false
        },
        include: [
          {
            model: db['User'],
            as: 'createdByData',
            attributes: [ 'id', 'name', 'email' ]
          },
          {
            model: db['User'],
            as: 'updatedByData',
            attributes: [ 'id', 'name', 'email' ]
          }
        ]
      });

      if (!stock) {
        return res.status(404).json({
          success: false,
          message: 'Stock not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Stock fetched successfully.',
        data: stock,
      });
    } catch (error) {
      logger.error('Failed to get stock by id', { error });
      next(error);
    }
  }

  async create(req: any, res: Response, next: NextFunction) {
    try {
      const stockData = {
        ...req.body,
        createdBy: req.user?.id,
        updatedBy: req.user?.id
      };

      const stock = await db['Stock'].create(stockData);

      return res.status(201).json({
        success: true,
        message: 'Stock created successfully.',
        data: stock,
      });
    } catch (error) {
      logger.error('Failed to create stock', { error });
      next(error);
    }
  }

  async update(req: any, res: Response, next: NextFunction) {
    try {
      const stockId = Number(req.params.id);
      if (Number.isNaN(stockId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid stock id provided.',
        });
      }

      const stock = await db['Stock'].findOne({
        where: {
          id: stockId,
          isDelete: false
        }
      });

      if (!stock) {
        return res.status(404).json({
          success: false,
          message: 'Stock not found.',
        });
      }

      const updateData = {
        ...req.body,
        updatedBy: req.user?.id
      };

      await stock.update(updateData);
      const updatedStock = await stock.reload();

      return res.status(200).json({
        success: true,
        message: 'Stock updated successfully.',
        data: updatedStock,
      });
    } catch (error) {
      logger.error('Failed to update stock', { error });
      next(error);
    }
  }

  async delete(req: any, res: Response, next: NextFunction) {
    try {
      const stockId = Number(req.params.id);
      if (Number.isNaN(stockId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid stock id provided.',
        });
      }

      const stock = await db['Stock'].findOne({
        where: {
          id: stockId,
          isDelete: false
        }
      });

      if (!stock) {
        return res.status(404).json({
          success: false,
          message: 'Stock not found.',
        });
      }

      await stock.update({
        isDelete: true,
        deletedBy: req.user?.id
      });

      return res.status(200).json({
        success: true,
        message: 'Stock deleted successfully.',
      });
    } catch (error) {
      logger.error('Failed to delete stock', { error });
      next(error);
    }
  }

  async updateStatus(req: any, res: Response, next: NextFunction) {
    try {
      const stockId = Number(req.params.id);
      if (Number.isNaN(stockId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid stock id provided.',
        });
      }

      const stock = await db['Stock'].findOne({
        where: {
          id: stockId,
          isDelete: false
        }
      });

      if (!stock) {
        return res.status(404).json({
          success: false,
          message: 'Stock not found.',
        });
      }

      const { status } = req.body;
      if (status === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Status is required.',
        });
      }

      await stock.update({
        status: status,
        updatedBy: req.user.id
      });

      const updatedStock = await stock.reload();

      return res.status(200).json({
        success: true,
        message: 'Stock status updated successfully.',
        data: updatedStock,
      });
    } catch (error) {
      logger.error('Failed to update stock status', { error });
      next(error);
    }
  }

  async getStockStats(req: any, res: Response, next: NextFunction) {
    try {
      const totalStocks = await db['Stock'].count({
        where: { isDelete: false }
      });

      const activeStocks = await db['Stock'].count({
        where: { isDelete: false, status: 1 }
      });

      const inactiveStocks = await db['Stock'].count({
        where: { isDelete: false, status: 0 }
      });

      const certifiedStocks = await db['Stock'].count({
        where: { isDelete: false, isCertified: true }
      });

      const totalCarat = await db['Stock'].sum('finalCarat', {
        where: { isDelete: false }
      });

      const totalValue = await db['Stock'].sum('value', {
        where: { isDelete: false }
      });

      return res.status(200).json({
        success: true,
        message: 'Stock statistics fetched successfully.',
        data: {
          totalStocks,
          activeStocks,
          inactiveStocks,
          certifiedStocks,
          totalCarat: totalCarat || 0,
          totalValue: totalValue || 0
        }
      });
    } catch (error) {
      logger.error('Failed to get stock statistics', { error });
      next(error);
    }
  }
}