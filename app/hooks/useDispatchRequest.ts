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
    }: {
      config: AxiosRequestConfig;
      limitation?: RequestLimitation;
      name: string;
    }) => {
      dispatch(dispatchRequest({ config, limitation, name }));
    },
    [dispatch],
  );
}
