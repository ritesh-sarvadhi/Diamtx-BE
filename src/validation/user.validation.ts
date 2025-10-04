import { validateRequest } from './helper';
import Joi from 'joi';

export const createAccountSchema = (req, res, next) =>{
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().length(10).required(),
  });
  validateRequest(req, next, schema);
};

export const loginSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Username is required',
      'any.required': 'Username is required'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password is required',
      'any.required': 'Password is required'
    })
  });
  validateRequest(req, next, schema);
};