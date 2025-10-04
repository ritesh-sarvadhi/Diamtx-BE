import { Request, Response } from 'express';
import { ApplicationController } from './';
import { logger } from '../../logger/Logger';

// Extend Request interface to include condition property
interface ExtendedRequest extends Request {
  condition?: any;
}

export class AuthController extends ApplicationController {

  constructor() {
    super('User');
  }

  /**
   * Login API - Authenticates user with name and password
   * Handles all scenarios: user not found, wrong password, inactive user, etc.
   */
  login(req: ExtendedRequest, res: Response) {
    try {
      const { name, password } = req.body;

      // Set condition for finding user by name
      req.condition = { where: { name }};

      return super._findOne(req, res, data => {
        // Scenario 1: User not found
        if (!data) {
          logger.warn(`Login attempt failed - User not found: ${name} - ${req.ip}`);
          return res.status(401).json({
            success: false,
            message: 'Invalid credentials. User not found.'
          });
        }

        // Scenario 2: User account is inactive/disabled
        if (data.status === false) {
          logger.warn(`Login attempt failed - Inactive user: ${name} - ${req.ip}`);
          return res.status(403).json({
            success: false,
            message: 'Account is inactive. Please contact administrator.'
          });
        }

        // Scenario 3: Check password authentication
        const isPasswordValid = data.authenticate(password);
        if (!isPasswordValid) {
          logger.warn(`Login attempt failed - Wrong password: ${name} - ${req.ip}`);
          return res.status(401).json({
            success: false,
            message: 'Invalid credentials. Wrong password.'
          });
        }

        // Scenario 4: Successful login
        try {
          // Generate JWT token
          const token = data.generateToken();

          // Update user's access token and login time
          data.update({
            accessToken: token,
            logoutAt: null // Clear logout time on successful login
          }).then(() => {
            // Prepare user data for response (exclude sensitive information)
            const userData = {
              id: data.id,
              name: data.name,
              email: data.email,
              email2: data.email2,
              phone: data.phone,
              roleId: data.roleId,
              refId: data.refId,
              isApiTrue: data.isApiTrue,
              dayTermsId: data.dayTermsId,
              dayTermsName: data.dayTermsName,
              location: data.location,
              status: data.status,
              loginType: data.loginType,
              companyId: data.companyId,
              departmentId: data.departmentId,
              termsId: data.termsId,
              userLevel: data.userLevel,
              isEmployee: data.isEmployee,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt
            };

            logger.info(`Successful login: ${name} - ${req.ip}`);

            res.status(200).json({
              success: true,
              message: 'Login successful',
              data: {
                userDetails: userData,
                token: token,
                tokenType: 'Bearer',
                expiresIn: '1 hour'
              }
            });
          }).catch(updateError => {
            logger.error(`Token update failed for user: ${name} - ${updateError.message}`);
            res.status(500).json({
              success: false,
              message: 'Authentication failed. Please try again.'
            });
          });

        } catch (tokenError) {
          logger.error(`Token generation failed for user: ${name} - ${tokenError.message}`);
          res.status(500).json({
            success: false,
            message: 'Authentication failed. Please try again.'
          });
        }
      });

    } catch (error) {
      logger.error(`Login error: ${error.message} - ${req.ip}`);
      res.status(500).json({
        success: false,
        message: 'Login failed. Please try again later.'
      });
    }
  }

}
