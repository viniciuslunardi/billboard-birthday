import * as statusCodes from 'http-status';
import { HttpError } from '@src/exceptions/http/HttpError';

export class UnprocessableEntity extends HttpError {
  constructor(message: string) {
    super(message);
    this._code = statusCodes.UNPROCESSABLE_ENTITY;
  }
}
