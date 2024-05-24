import { IResponseData } from '../common/interfaces/app.interface';

const DEFAULT_HEADER = {
  'content-type': 'application/json',
} as const;

export const createRes = (responseData: IResponseData): void => {
  const { res, code, message, data } = responseData;
  const defaultResponse = { code, message };
  res.writeHead(code, DEFAULT_HEADER);

  const result = data ? data : defaultResponse;
  res.end(JSON.stringify(result));
};
