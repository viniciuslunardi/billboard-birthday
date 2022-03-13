export interface IErrorGeneric {
  message: string;
  code?: number;
  status?: number;
  data?: object;
  response?: object;
}

export interface IErrorData {
  data: {
    code?: number;
    status?: number;
    message?: string;
    error: {
      code?: number;
      status?: number;
      message: string;
    };
  };
  status?: number;
}

export interface IErrorResponse {
  response: {
    data: {
      error: {
        code?: number;
        message: string;
      };
      message: string;
    };
    status?: number;
  };
}
