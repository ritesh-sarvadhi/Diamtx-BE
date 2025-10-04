declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      [key: string]: any;
    };
  }
}