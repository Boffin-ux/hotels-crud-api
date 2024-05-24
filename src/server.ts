import { IncomingMessage, ServerResponse, createServer, Server } from 'http';
import { IError, IServerApp } from './common/interfaces/app.interface';
import { Router } from './router';
import { userRoutes } from './users/users.route';

export class ServerApp implements IServerApp {
  private port: number;
  private server: Server;
  private router: Router;

  constructor(port: number) {
    this.port = port;
    this.server = this._createServer();
    this.router = new Router(userRoutes());
  }

  private _createServer() {
    return createServer((req: IncomingMessage, res: ServerResponse) => {
      this.router.getRoute(req, res);
    });
  }

  init(name = 'Server') {
    this.server.listen(this.port, () => {
      console.log(`${name} process ${process.pid} listen:${this.port}`);
    });

    this.server.on('error', (err: IError) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`No access to port: ${this.port}`);
      } else {
        console.log(err.message);
      }
    });
  }

  close(): void {
    this.server.close();
  }
}
