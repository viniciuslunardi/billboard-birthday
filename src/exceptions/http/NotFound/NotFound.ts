import * as statusCodes from 'http-status';
import { HttpError } from '@src/exceptions/http/HttpError';

export class NotFound extends HttpError {
  constructor(message: string) {
    super(message);
    this._code = statusCodes.NOT_FOUND;
  }
}
