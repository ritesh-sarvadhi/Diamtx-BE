import { Request, Response, NextFunction } from 'express';

import db from '../../models';
import { logger } from '../../logger/Logger';

export class TermDetailController {
  private accountModel = db['Account'];
  private termModel = db['TermsDetail'];

  async create(req: Request, res: Response, next: NextFunction) {
    const accountId = Number(req.body.accountId);
    if (Number.isNaN(accountId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account id provided.',
      });
    }

    try {
      const account = await this.accountModel.findByPk(accountId, { attributes: ['id'] });
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found.',
        });
      }

      const term = await this.termModel.create({
        ...(req.body ?? {}),
        refId: accountId,
      });

      return res.status(201).json({
        success: true,
        message: 'Term detail created successfully.',
        data: term,
      });
    } catch (error) {
      logger.error('Failed to create term detail', { error, accountId });
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    const accountId = Number(req.params.accountId);
    if (Number.isNaN(accountId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account id provided.',
      });
    }

    try {
      const account = await this.accountModel.findByPk(accountId, { attributes: ['id'] });
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found.',
        });
      }

      const terms = await this.termModel.findAll({
        where: { refId: accountId },
        order: [[ 'createdAt', 'DESC' ]],
      });

      return res.status(200).json({
        success: true,
        message: 'Term details fetched successfully.',
        data: terms,
      });
    } catch (error) {
      logger.error('Failed to list term details', { error, accountId });
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const accountId = Number(req.body.accountId);
    const termId = Number(req.params.termId);

    if (Number.isNaN(accountId) || Number.isNaN(termId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account or term id provided.',
      });
    }

    try {
      const term = await this.termModel.findOne({
        where: { id: termId, refId: accountId },
      });

      if (!term) {
        return res.status(404).json({
          success: false,
          message: 'Term detail not found.',
        });
      }

      const payload = { ...(req.body ?? {}) };
      [ 'id', 'refId', 'createdAt', 'updatedAt', 'deletedAt' ].forEach(field => {
        if (field in payload) delete payload[field];
      });

      await term.update(payload);
      const refreshed = await term.reload();

      return res.status(200).json({
        success: true,
        message: 'Term detail updated successfully.',
        data: refreshed,
      });
    } catch (error) {
      logger.error('Failed to update term detail', { error, accountId, termId });
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    const accountId = Number(req.params.accountId);
    const termId = Number(req.params.termId);

    if (Number.isNaN(accountId) || Number.isNaN(termId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account or term id provided.',
      });
    }

    try {
      const term = await this.termModel.findOne({
        where: { id: termId, refId: accountId },
      });

      if (!term) {
        return res.status(404).json({
          success: false,
          message: 'Term detail not found.',
        });
      }

      await term.destroy();

      return res.status(200).json({
        success: true,
        message: 'Term detail deleted successfully.',
      });
    } catch (error) {
      logger.error('Failed to delete term detail', { error, accountId, termId });
      next(error);
    }
  }

  async approve(req: Request, res: Response, next: NextFunction) {
    const accountId = Number(req.body.accountId);
    const termId = Number(req.body.termId);

    if (Number.isNaN(accountId) || Number.isNaN(termId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account or term id provided.',
      });
    }

    try {
      const term = await this.termModel.findOne({
        where: { id: termId, refId: accountId },
      });

      if (!term) {
        return res.status(404).json({
          success: false,
          message: 'Term detail not found.',
        });
      }

      const approverIdRaw = req.body?.verifiedBy;
      const approverId =
        typeof approverIdRaw === 'number'
          ? approverIdRaw
          : typeof approverIdRaw === 'string' && approverIdRaw.trim().length
            ? Number(approverIdRaw)
            : undefined;

      await term.update({
        isVerified: true,
        verifiedTime: new Date(),
        verifiedBy: req?.['user']?.id
          ? term.get('verifiedBy')
          : approverId,
        editStatus: false,
      });

      const refreshed = await term.reload();

      return res.status(200).json({
        success: true,
        message: 'Term detail approved successfully.',
        data: refreshed,
      });
    } catch (error) {
      logger.error('Failed to approve term detail', { error, accountId, termId });
      next(error);
    }
  }
}

export default TermDetailController;
