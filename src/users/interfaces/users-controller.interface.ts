import { IncomingMessage, ServerResponse } from 'http';

export interface IUsersController {
  getAll: (res: ServerResponse) => Promise<void>;

  getById: (res: ServerResponse, req: IncomingMessage) => Promise<void>;

  post: (res: ServerResponse, req: IncomingMessage) => Promise<void>;

  delete: (res: ServerResponse, req: IncomingMessage) => Promise<void>;

  put: (res: ServerResponse, req: IncomingMessage) => Promise<void>;
}
