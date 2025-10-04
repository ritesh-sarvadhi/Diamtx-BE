import { Request, Response, NextFunction } from 'express';
import { Op, literal, where, fn, col, UniqueConstraintError } from 'sequelize';

import db from '../../models';
import { logger } from '../../logger/Logger';
import appError from '../../utils/errorHelper';
import { ErrorType } from '../../utils/errorTypes';
import { sequelize } from '../../config/sequelize';

export class AccountController {
  private accountModel = db['Account'];
  private masterModel = db['Master'];

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = { ...(req.body ?? {}) };
      const shortCode = await this.generateShortCode();

      delete payload.shortCode;

      const account = await this.accountModel.create({
        ...payload,
        shortCode,
      });

      return res.status(201).json({
        success: true,
        message: 'Account created successfully.',
        data: account,
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        logger.warn('Account creation failed due to unique constraint', { error: error.errors });
        return res.status(409).json({
          success: false,
          message: error.errors?.[0]?.message || 'Account already exists.',
        });
      }

      logger.error('Failed to create account', { error });
      next(error);
    }
  }

  async listActive(req: Request, res: Response, next: NextFunction) {
    try {
      const [accounts] = await sequelize.query(
        `
          SELECT 
            a.*, 
            (
              SELECT string_agg(m.name, ', ')
              FROM "Master" m
              WHERE m.id = ANY(a.categories)
            ) AS category_names
          FROM "Account" a
          WHERE a."isActive" = TRUE
          ORDER BY a."name" ASC;
        `,
      );

      return res.status(200).json({
        success: true,
        message: 'Active accounts fetched successfully.',
        data: accounts,
      });
    } catch (error) {
      logger.error('Failed to fetch active accounts', { error });
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const accountId = Number(req.params.id);
    if (Number.isNaN(accountId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account id provided.',
      });
    }

    try {
      const account = await this.accountModel.findByPk(accountId);
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found.',
        });
      }

      const updatePayload = { ...(req.body ?? {}) };
      [ 'id', 'shortCode', 'createdAt', 'updatedAt', 'deletedAt' ].forEach(field => {
        if (field in updatePayload) delete updatePayload[field];
      });

      if (typeof updatePayload.name === 'string') {
        const normalizedName = updatePayload.name.trim();
        const currentName = String(account.get('name') ?? '').trim();

        if (!normalizedName) {
          return res.status(400).json({
            success: false,
            message: 'Account name cannot be empty.',
          });
        }

        if (normalizedName.toLowerCase() === currentName.toLowerCase()) {
          delete updatePayload.name;
        } else {
          const duplicate = await this.accountModel.findOne({
            where: {
              name: normalizedName,
              id: { [Op.ne]: accountId },
            },
            attributes: ['id'],
          });

          if (duplicate) {
            return res.status(409).json({
              success: false,
              message: 'Account name already exists.',
            });
          }

          updatePayload.name = normalizedName;
        }
      }

      await account.update(updatePayload);
      const refreshed = await account.reload();

      return res.status(200).json({
        success: true,
        message: 'Account updated successfully.',
        data: refreshed,
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        logger.warn('Account update failed due to unique constraint', { error: error.errors, accountId });
        return res.status(409).json({
          success: false,
          message: error.errors?.[0]?.message || 'Account already exists.',
        });
      }

      logger.error('Failed to update account', { error });
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = Number(req.params.id);
      if (Number.isNaN(accountId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid account id provided.',
        });
      }

      const account = await this.accountModel.findByPk(accountId);
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found.',
        });
      }

      await account.destroy();

      return res.status(200).json({
        success: true,
        message: 'Account deleted successfully.',
      });
    } catch (error) {
      logger.error('Failed to delete account', { error });
      next(error);
    }
  }

  async listByCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = (req.body?.data ?? req.body ?? {}) as {
        categoryNames?: unknown;
        search?: unknown;
      };

      const { categoryNames, search } = payload;
      const whereCondition: Record<string, unknown> = {};
      let categoryIds: number[] = [];

      if (Array.isArray(categoryNames) && categoryNames.length) {
        const normalizedNames = categoryNames
          .filter(name => typeof name === 'string' && name.trim().length > 0)
          .map(name => (name as string).trim().toLowerCase());

        if (normalizedNames.length === 0) {
          throw new appError('Category names must contain valid strings.', ErrorType.validation_error);
        }

        const categories = await this.masterModel.findAll({
          attributes: ['id'],
          where: {
            [Op.or]: normalizedNames.map(name => where(fn('lower', col('name')), name)),
          },
        });

        categoryIds = categories.map(category => Number(category.get('id'))).filter(id => !Number.isNaN(id));

        if (categoryIds.length > 0) {
          whereCondition['categories'] = { [Op.overlap]: categoryIds };
        } else {
          return res.status(200).json({
            success: true,
            message: 'Accounts fetched successfully.',
            data: [],
          });
        }
      }

      if (typeof search === 'string' && search.trim().length > 0) {
        whereCondition['name'] = { [Op.iLike]: `%${search.trim()}%` };
      }

      const accounts = await this.accountModel.findAll({
        where: whereCondition,
        attributes: [
          'id',
          [
            literal(`CASE 
              WHEN "Account"."name" IS NULL THEN "Account"."contactPersonName"
              WHEN "Account"."contactPersonName" IS NULL THEN "Account"."name"
              ELSE "Account"."name" || ' / ' || "Account"."contactPersonName"
            END`),
            'name',
          ],
        ],
      });

      return res.status(200).json({
        success: true,
        message: 'Accounts fetched successfully.',
        data: accounts,
      });
    } catch (error) {
      logger.error('Failed to fetch accounts by categories', { error });
      next(error);
    }
  }

  private async generateShortCode(): Promise<string> {
    const numericLiteral =
      'COALESCE(NULLIF(regexp_replace("Account"."shortCode", \'\\D\', \'\', \'g\'), \'\'), \'0\')::int';

    const lastAccount = await this.accountModel.findOne({
      attributes: [
        'shortCode',
        [ literal(numericLiteral), 'numericCode' ],
      ],
      order: [[ literal(numericLiteral), 'DESC' ]],
    });

    const lastNumber = Number(lastAccount?.get('numericCode') ?? 0);
    const nextNumber = Number.isNaN(lastNumber)
      ? 1
      : lastNumber + 1;

    return `P${String(nextNumber).padStart(5, '0')}`;
  }
}

export default AccountController;
