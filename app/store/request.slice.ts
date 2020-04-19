import toFinite from 'lodash/toFinite';
import omit from 'lodash/omit';
import {
  combineReducers,
  createAction,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export enum RequestLimitation {
  NONE = 'none',
  LEADING = 'leading',
  LATEST = 'latest',
}

type Request = {
  name: string;
  limitation: RequestLimitation;
  config: AxiosRequestConfig;
  id: string;
};

const initialQueueState: {
  ids: string[];
  requests: Record<string, Request>;
  idsByName: Record<string, string[]>;
} = {
  ids: [],
  requests: {},
  idsByName: {},
};

const queueSlice = createSlice({
  name: 'queue',
  initialState: initialQueueState,
  reducers: {
    addRequest(state, action) {
      const { id } = action.payload;
      state.ids.push(id);
      state.requests[id] = action.payload;
      if (state.idsByName[action.payload.name]) {
        state.idsByName[action.payload.name].push(id);
      } else {
        state.idsByName[action.payload.name] = [id];
      }
    },
    removeRequestById(state, action) {
      const { id: requestId, name } = action.payload;
      const idsByName = {
        ...state.idsByName,
        [name]: (state.idsByName[name] || []).filter((id) => requestId !== id),
      };

      return {
        ids: state.ids.filter((id) => requestId !== id),
        requests: omit(state.requests, requestId),
        idsByName:
          idsByName[name].length === 0 ? omit(idsByName, name) : idsByName,
      };
    },
    removeRequestsByName(state, action) {
      const { name } = action.payload;
      const ids = state.idsByName[name];

      return {
        ids: state.ids.filter((id) => !ids.some((i) => i === id)),
        requests: omit(state.requests, ids),
        idsByName: omit(state.idsByName, name),
      };
    },
  },
});

export const dispatchRequest = createAction(
  'request/dispatch',
  ({ config, limitation, name, timeout }) => {
    return {
      payload: {
        id: nanoid(),
        name,
        config,
        limitation,
        timeout: toFinite(timeout),
      },
      meta: {},
      error: null,
    };
  },
);

export const resolvedRequest = createAction(
  'request/resolved',
  ({
    name,
    id,
    response,
  }: {
    name?: string;
    id: string;
    response: AxiosResponse;
  }) => ({
    payload: { name, id, response },
  }),
);

export const rejectedRequest = createAction(
  'request/rejected',
  ({ name, id, error }: { name: string; id: string; error: AxiosError }) => ({
    payload: { name, id, error },
  }),
);

export const {
  actions: { addRequest, removeRequestById, removeRequestsByName },
} = queueSlice;

export const reducer = combineReducers({
  queue: queueSlice.reducer,
});
