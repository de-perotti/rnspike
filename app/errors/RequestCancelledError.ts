import { AxiosRequestConfig } from 'axios';
import { RequestLimitation } from '../store/request.slice';

export class RequestCancelledError extends Error {
  constructor(
    public metadata: {
      id: string;
      name: string;
      config: AxiosRequestConfig;
      limitation: RequestLimitation;
      timeout: number;
    },
    message?: string,
  ) {
    super(message);
    this.name = 'RequestCancelledError';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}
