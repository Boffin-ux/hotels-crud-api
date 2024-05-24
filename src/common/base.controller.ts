import { IncomingMessage } from 'http';
import { ResponseMessages } from './constants';
import { IBaseController } from './interfaces/app.interface';

export class BaseController implements IBaseController {
  async parseReqData<T>(req: IncomingMessage): Promise<T> {
    return new Promise((resolve, reject) => {
      let body = '';

      req.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
      req.on('error', reject);
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : null);
        } catch {
          reject(new Error(ResponseMessages.JSON_ERR));
        }
      });
    });
  }

  getUrlParam(req: IncomingMessage): string | null {
    const { url } = req;
    return url?.split('/').pop() || null;
  }
}
