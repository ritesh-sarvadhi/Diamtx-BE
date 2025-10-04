import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        phone: string | null;
        roleId: string;
        status: boolean;
        loginType: string;
        isEmployee: boolean;
        location: string[];
        canPriceUpdate: boolean;
        isSales: boolean;
        refId: string;
        isSuperAdminRS: boolean;
        Role: {
          id: string;
          name: string;
        };
        [key: string]: any;
      };
    }
  }
}