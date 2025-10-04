import { validateRequest } from './helper';
import Joi from 'joi';

export const createStockSchema = (req, res, next) => {
  const schema = Joi.object({
    srNo: Joi.number().integer().optional(),
    lotNo: Joi.string().optional(),
    packetNo: Joi.string().optional(),
    certificateNo: Joi.string().optional(),
    carat: Joi.number().positive().optional(),
    finalCarat: Joi.number().positive().optional(),
    price: Joi.number().positive().optional(),
    value: Joi.number().positive().optional(),
    pieces: Joi.number().integer().positive().optional(),
    finalPieces: Joi.number().integer().positive().optional(),
    isCertified: Joi.boolean().optional(),
    status: Joi.number().integer().valid(0, 1).optional(),
    accountId: Joi.number().integer().positive().optional(),
    locationId: Joi.number().integer().positive().optional(),
    companyId: Joi.number().integer().positive().optional(),
    departmentId: Joi.number().integer().positive().optional()
  });
  validateRequest(req, next, schema);
};

export const updateStockSchema = (req, res, next) => {
  const schema = Joi.object({
    srNo: Joi.number().integer().optional(),
    lotNo: Joi.string().optional(),
    packetNo: Joi.string().optional(),
    certificateNo: Joi.string().optional(),
    carat: Joi.number().positive().optional(),
    finalCarat: Joi.number().positive().optional(),
    price: Joi.number().positive().optional(),
    value: Joi.number().positive().optional(),
    pieces: Joi.number().integer().positive().optional(),
    finalPieces: Joi.number().integer().positive().optional(),
    isCertified: Joi.boolean().optional(),
    status: Joi.number().integer().valid(0, 1).optional(),
    accountId: Joi.number().integer().positive().optional(),
    locationId: Joi.number().integer().positive().optional(),
    companyId: Joi.number().integer().positive().optional(),
    departmentId: Joi.number().integer().positive().optional()
  });
  validateRequest(req, next, schema);
};

export const updateStatusSchema = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.number().integer().valid(0, 1).required().messages({
      'any.required': 'Status is required',
      'any.only': 'Status must be 0 or 1'
    })
  });
  validateRequest(req, next, schema);
};
