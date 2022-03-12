import * as statusCodes from "http-status";
import {HttpError} from '@src/exceptions/http/HttpError';

export class UnprocessableEntity extends HttpError {
    public get code(): number {
		return statusCodes.UNPROCESSABLE_ENTITY;
	}
}