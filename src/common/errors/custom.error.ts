import { HttpStatus, ResponseMessages } from '../constants';

export class CustomError extends Error {
  code: number;

  constructor(
    message = ResponseMessages.INTERNAL_SERVER_ERROR,
    code = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, CustomError.prototype);
    Error.captureStackTrace(this);
  }
}
