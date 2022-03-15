/* istanbul ignore file */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestConfig = AxiosRequestConfig;

export type Response<T = unknown> = AxiosResponse<T>;

export class Request {
  constructor(private request = axios) {}

  public get<T>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
    return this.request.get<T, Response<T>>(url, config);
  }
}
