import { Response, Request, NextFunction } from 'express';

export interface IUsersController {
  getAll: (res: Response) => Promise<void>;

  getById: (res: Response, req: Request, next: NextFunction) => Promise<void>;

  post: (res: Response, req: Request, next: NextFunction) => Promise<void>;

  delete: (res: Response, req: Request, next: NextFunction) => Promise<void>;

  put: (res: Response, req: Request, next: NextFunction) => Promise<void>;
}
