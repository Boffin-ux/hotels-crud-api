import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../../users/models/user.model';

interface IServerApp {
  init(): void;
  close(): void;
}

interface IError extends Error {
  code?: string;
}

interface IRouter {
  getRoute(req: IncomingMessage, res: ServerResponse): Promise<void>;
}

interface IResponseData {
  res: ServerResponse;
  code: number;
  message?: string;
  data?: User[] | User;
}

interface IBaseController {
  parseReqData: <T>(req: IncomingMessage, res: ServerResponse) => Promise<T>;
  getUrlParam: (req: IncomingMessage) => string | null;
}

export { IServerApp, IError, IRouter, IResponseData, IBaseController };
