import { IncomingMessage, ServerResponse } from 'http';
import { ResponseMessages, HttpStatus, USERS_ENDPOINT } from './common/constants';
import { IRouter } from './common/interfaces/app.interface';
import { ApiRoute } from './common/types/api-route.type';
import { CustomError } from './common/errors/custom.error';
import { createRes, createEndpointKey } from './utils';

export class Router implements IRouter {
  private routes: ApiRoute;

  constructor(routes: ApiRoute) {
    this.routes = routes;
  }

  async getRoute(req: IncomingMessage, res: ServerResponse) {
    try {
      const { url, method } = req;

      if (url && method) {
        const endpoint = createEndpointKey(USERS_ENDPOINT, url, method);
        const handler = Object.hasOwn(this.routes, endpoint) && this.routes[endpoint];

        if (!handler) {
          throw new CustomError(ResponseMessages.INVALID_ENDPOINT, HttpStatus.NOT_FOUND);
        }

        await handler(res, req);
      }
    } catch (e) {
      const code = e instanceof CustomError ? e.code : HttpStatus.INTERNAL_SERVER_ERROR;
      const message = e instanceof CustomError ? e.message : ResponseMessages.INTERNAL_SERVER_ERROR;

      return createRes({ res, code, message });
    }
  }
}
