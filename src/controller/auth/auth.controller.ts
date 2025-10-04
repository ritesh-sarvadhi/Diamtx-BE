import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { QueryTypes } from 'sequelize';

import { createJWToken } from '../../config/auth';
import { sequelize } from '../../config/sequelize';
import db from '../../models';
import { logger } from '../../logger/Logger';

const logAuthFailure = (error: unknown, identifier: string, context: string) => {
  const err = error instanceof Error
    ? error
    : new Error(String(error));
  logger.error(`[Auth:${context}] ${identifier} - ${err.message}`);
};

const logGeneralFailure = (error: unknown, context: string) => {
  const err = error instanceof Error
    ? error
    : new Error(String(error));
  logger.error(`[Auth:${context}] ${err.message}`);
};

interface UserRecord {
  id: number;
  name: string;
  email: string | null;
  email2: string | null;
  phone: string | null;
  roleId: number | null;
  refId: number | null;
  isApiTrue: boolean | null;
  dayTermsId: number | null;
  dayTermsName: string | null;
  location: any;
  status: boolean | null;
  loginType: string | null;
  companyId: number | null;
  departmentId: number | null;
  termsId: number | null;
  userLevel: number | null;
  isEmployee: boolean | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  password: string;
}

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body ?? {};

      const identifier = typeof name === 'string' && name.trim().length > 0
        ? name.trim()
        : typeof email === 'string' && email.trim().length > 0
          ? email.trim()
          : '';

      if (!identifier || typeof password !== 'string' || password.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Username/email and password are required for login.'
        });
      }

      const normalizedIdentifier = identifier.toLowerCase();

      const users = await sequelize.query<UserRecord>(
        'SELECT * FROM "User" WHERE lower("name") = :identifier OR lower("email") = :identifier LIMIT 1',
        {
          replacements: { identifier: normalizedIdentifier },
          type: QueryTypes.SELECT
        }
      );

      const user = users[0];

      if (!user) {
        const error = new Error(`User not found: ${identifier}`);
        logAuthFailure(error, identifier, 'User Not Found');
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. User not found.'
        });
      }

      if (user.status === false) {
        const error = new Error(`Inactive user login attempt: ${identifier}`);
        logAuthFailure(error, identifier, 'Inactive Account');
        return res.status(403).json({
          success: false,
          message: 'Account is inactive. Please contact administrator.'
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        const error = new Error(`Wrong password for user: ${identifier}`);
        logAuthFailure(error, identifier, 'Wrong Password');
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Wrong password.'
        });
      }

      const token = createJWToken({ email: user.email, id: user.id });

      try {
        await db['User'].update(
          { accessToken: token, logoutAt: null },
          { where: { id: user.id }}
        );
      } catch (updateError) {
        logAuthFailure(updateError, identifier, 'Token Update Failed');
        return res.status(500).json({
          success: false,
          message: 'Authentication failed. Please try again.'
        });
      }

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        email2: user.email2,
        phone: user.phone,
        roleId: user.roleId,
        refId: user.refId,
        isApiTrue: user.isApiTrue,
        dayTermsId: user.dayTermsId,
        dayTermsName: user.dayTermsName,
        location: user.location,
        status: user.status,
        loginType: user.loginType,
        companyId: user.companyId,
        departmentId: user.departmentId,
        termsId: user.termsId,
        userLevel: user.userLevel,
        isEmployee: user.isEmployee,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };

      logger.info(`Successful login: ${identifier} - ${req.ip}`);

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          userDetails: userData,
          token,
          tokenType: 'Bearer',
          expiresIn: '1 hour'
        }
      });
    } catch (error) {
      logGeneralFailure(error, 'Login General Error');
      return res.status(500).json({
        success: false,
        message: 'Login failed. Please try again later.'
      });
    }
  }
}

export default AuthController;
