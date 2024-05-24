import { IncomingMessage, ServerResponse } from 'http';

export type ApiRoute = {
  [key: string]: (
    response: ServerResponse<IncomingMessage>,
    request: IncomingMessage,
  ) => Promise<void>;
};
