import * as statusCodes from "http-status";

export class HttpError extends Error {
    protected _code: number;

    constructor(message: string) {    
        super(message);
        this._code = statusCodes.INTERNAL_SERVER_ERROR;
    }

    public get code(): number {
		return this._code;
	}
}