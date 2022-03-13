import * as statusCodes from 'http-status';

export class HttpError extends Error {
  protected _code: number;

  constructor(
    message: string,
    code: number = statusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this._code = code;
  }

  public get code(): number {
    return this._code;
  }
}
