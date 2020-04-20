import toFinite from 'lodash/toFinite';
import { CANCEL } from 'redux-saga';
import axiosOriginal, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Messages } from '../errors/constants';

type ThunkApi = {
  // https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
  signal: any;
  getState: any;
  dispatch: any;
  extra: any;
  rejectWithValue: any;
  requestId: any;
};

const MAX_TIMEOUT_IN_MS = 10000;

const DEFAULT_AXIOS_CONFIG: Omit<AxiosRequestConfig, 'timeout'> = {};

function getTimeout(timeout?: number) {
  const numberTimeout = toFinite(timeout);

  if (numberTimeout !== 0 && numberTimeout <= MAX_TIMEOUT_IN_MS) {
    return timeout;
  }

  return MAX_TIMEOUT_IN_MS;
}

export function cancellableThunkRequest<T>(
  { timeout, ...config }: AxiosRequestConfig,
  thunkApi: ThunkApi,
) {
  const source = axios.CancelToken.source();

  thunkApi.signal.addEventListener('abort', () => {
    source.cancel(Messages.ABORTED);
  });

  const coalescedConfig = {
    ...DEFAULT_AXIOS_CONFIG,
    ...config,
    cancelToken: source.token,
  };

  const time = setTimeout(() => {
    source.cancel(Messages.TIMEDOUT);
  }, getTimeout(timeout));

  return axios(coalescedConfig).then((resp: AxiosResponse<T>) => {
    clearTimeout(time);
    return resp.data;
  });
}

export function cancellableRequest<T>(
  { timeout, ...config }: AxiosRequestConfig,
  cancelKey = CANCEL,
) {
  const source = axios.CancelToken.source();

  const coalescedConfig = {
    ...DEFAULT_AXIOS_CONFIG,
    ...config,
    cancelToken: source.token,
  };

  const time = setTimeout(() => {
    source.cancel(Messages.TIMEDOUT);
  }, getTimeout(timeout));

  const promise = axios(coalescedConfig).then((resp: AxiosResponse<T>) => {
    clearTimeout(time);
    return resp.data;
  });

  // @ts-ignore
  promise[cancelKey] = () => source.cancel(Messages.CANCELLED);

  return promise;
}

export const axios = axiosOriginal;
