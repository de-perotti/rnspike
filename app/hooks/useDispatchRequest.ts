import { AxiosRequestConfig } from 'axios';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { dispatchRequest, RequestLimitation } from '../store/request.slice';

export function useDispatchRequest() {
  const dispatch = useDispatch();

  return useCallback(
    ({
      config,
      limitation = RequestLimitation.NONE,
      name,
      timeout,
    }: {
      config: AxiosRequestConfig;
      limitation?: RequestLimitation;
      name: string;
      timeout?: number;
    }) => {
      dispatch(dispatchRequest({ config, limitation, name, timeout }));
    },
    [dispatch],
  );
}
