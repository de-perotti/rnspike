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

// Warning, timeout does not work. Don't try using it.
// Try using cancel mechanics instead
const DEFAULT_AXIOS_CONFIG: AxiosRequestConfig = {};

export function cancellableThunkRequest<T>(
  { timeout, ...config }: AxiosRequestConfig,
  thunkApi: ThunkApi,
) {
  const source = axios.CancelToken.source();

  thunkApi.signal.addEventListener('abort', () => {
    source.cancel();
  });

  const time = setTimeout(() => {
    source.cancel();
  }, timeout);

  return axios({
    ...DEFAULT_AXIOS_CONFIG,
    ...config,
    cancelToken: source.token,
  }).then((resp: AxiosResponse<T>) => {
    clearTimeout(time);
    return resp.data;
  });
}

export function cancellableRequest<T>(
  config: AxiosRequestConfig,
  cancelKey = CANCEL,
) {
  const source = axios.CancelToken.source();

  const coalescedConfig = {
    ...DEFAULT_AXIOS_CONFIG,
    ...config,
    cancelToken: source.token,
  };

  const promise = axios(coalescedConfig).then(
    (resp: AxiosResponse<T>) => resp.data,
  );

  // @ts-ignore
  promise[cancelKey] = () => source.cancel();

  return promise;
}

export const axios = axiosOriginal;
