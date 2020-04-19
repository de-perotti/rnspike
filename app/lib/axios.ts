import { CANCEL } from 'redux-saga';
import axiosOriginal, { AxiosRequestConfig, AxiosResponse } from 'axios';

type ThunkApi = {
  // https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
  signal: any;
  getState: any;
  dispatch: any;
  extra: any;
  rejectWithValue: any;
  requestId: any;
};

const DEFAULT_AXIOS_CONFIG: Omit<AxiosRequestConfig, 'timeout'> = {};

export function cancellableThunkRequest<T>(
  { timeout, ...config }: AxiosRequestConfig,
  thunkApi: ThunkApi,
) {
  const source = axios.CancelToken.source();

  thunkApi.signal.addEventListener('abort', () => {
    source.cancel();
  });

  const coalescedConfig = {
    ...DEFAULT_AXIOS_CONFIG,
    ...config,
    cancelToken: source.token,
  };

  const time = setTimeout(() => {
    source.cancel();
  }, timeout);

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
    source.cancel();
  }, timeout);

  const promise = axios(coalescedConfig).then((resp: AxiosResponse<T>) => {
    clearTimeout(time);
    return resp.data;
  });

  // @ts-ignore
  promise[cancelKey] = () => source.cancel();

  return promise;
}

export const axios = axiosOriginal;
