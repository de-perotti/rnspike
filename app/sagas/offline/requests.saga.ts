import {
  all,
  call,
  take,
  race,
  takeEvery,
  delay,
  takeLatest,
  takeLeading,
  put,
  select,
  fork,
  join,
  flush,
  cancel,
  cancelled,
} from 'redux-saga/effects';
import { channel, buffers } from 'redux-saga';
import { cancellableRequest } from '../../lib/axios';
import {
  addRequest,
  RequestLimitation,
  removeRequestById,
  resolvedRequest,
  rejectedRequest,
  removeRequestsByName,
  dispatchRequest,
} from '../../store/request.slice';
import { setOffline } from '../../store/app.slice';
import { RequestTimedOutError } from '../../errors/RequestTimedOutError';
import { RequestCancelledError } from '../../errors/RequestCancelledError';
import { AppState } from '../../store/store';

function removedByName(name: string) {
  return (action) =>
    action.type === removeRequestsByName.type && name === action.payload.name;
}

function removedByIdAndName(id: string, name: string) {
  return (action) =>
    action.type === removeRequestById.type &&
    name === action.payload.name &&
    id === action.payload.id;
}

function* raceRequest({ payload }) {
  const {
    response,
    timedOut,
    cancelledByName,
    cancelledById,
    wentOffline,
    alreadyRejected,
    alreadyResolved,
  } = yield race({
    response: call(cancellableRequest, payload.config),
    timedOut: delay(payload.timeout || 10000),
    cancelledByName: take(removedByName(payload.name)),
    cancelledById: take(removedByIdAndName(payload.id, payload.name)),
    wentOffline: take(
      (action) => action.type === setOffline.type && action.payload,
    ),
    alreadyResolved: take(
      (action) =>
        action.type === resolvedRequest.type &&
        action.payload.id === payload.id,
    ),
    alreadyRejected: take(
      (action) =>
        action.type === rejectedRequest.type &&
        action.payload.id === payload.id,
    ),
  });

  const canSkip =
    cancelledByName ||
    cancelledById ||
    wentOffline ||
    alreadyRejected ||
    alreadyResolved;

  return {
    response,
    timedOut,
    canSkip,
  };
}

function* requestWorker({ payload }, { reprocessing = false } = {}) {
  try {
    if (!reprocessing) {
      yield put(addRequest(payload));
    }

    const { response, timedOut, canSkip } = yield raceRequest({ payload });

    if (canSkip) {
      return;
    }

    if (timedOut) {
      throw new RequestTimedOutError(payload);
    }

    if (response) {
      yield put(
        resolvedRequest({ name: payload.name, id: payload.id, response }),
      );
    }
  } catch (error) {
    yield put(rejectedRequest({ name: payload.name, id: payload.id, error }));
  } finally {
    if (yield cancelled()) {
      const error = new RequestCancelledError(payload);
      yield put(rejectedRequest({ name: payload.name, id: payload.id, error }));
    }
    yield put(removeRequestById({ id: payload.id, name: payload.name }));
  }
}

function* reprocessRequestsWorker({ maxParallelRequests }) {
  const { ids, requests } = yield select(
    (state: AppState) => state.request.queue,
  );
  const chan = yield call(channel, buffers.fixed(ids.length));

  for (const id of ids) {
    yield put(chan, requests[id]);
  }

  function* flushAndFilter(predicate) {
    const values = yield flush(chan);
    const filteredRequests = values?.filter?.(predicate) || [];

    if (filteredRequests.length === 0) {
      yield call([chan, chan.close]);
    }

    for (const request of filteredRequests) {
      yield put(chan, request);
    }
  }

  const byNameWatcher = yield takeEvery(removeRequestsByName.type, function* ({
    payload,
  }: ReturnType<typeof removeRequestsByName>) {
    yield call(flushAndFilter, (request) => {
      return request.name !== payload.name;
    });
  });

  const byIdWatcher = yield takeEvery(removeRequestById.type, function* ({
    payload,
  }: ReturnType<typeof removeRequestById>) {
    yield call(flushAndFilter, (request) => {
      return request.id !== payload.id;
    });
  });

  const workers = yield all(
    Array(maxParallelRequests).fill(
      fork(function* () {
        while (true) {
          const request = yield take(chan);
          yield call(
            requestWorker,
            { payload: request },
            { reprocessing: true },
          );
        }
      }),
    ),
  );

  yield join(workers);
  yield cancel([byNameWatcher, byIdWatcher]);
}

export function* watchRequests() {
  yield takeEvery<any>(
    (action) =>
      action.type === dispatchRequest.type &&
      action.payload.limitation === RequestLimitation.NONE,
    requestWorker,
  );

  yield takeLatest<any>(
    (action) =>
      action.type === dispatchRequest.type &&
      action.payload.limitation === RequestLimitation.LATEST,
    requestWorker,
  );

  yield takeLeading<any>(
    (action) =>
      action.type === dispatchRequest.type &&
      action.payload.limitation === RequestLimitation.LEADING,
    requestWorker,
  );
}

export function* watchRequestReprocess(readyChannel) {
  yield takeLatest(
    (action) => action.type === setOffline.type && !action.payload,
    reprocessRequestsWorker,
    { maxParallelRequests: 5 },
  );

  yield put(readyChannel, { ready: true });
  yield call([readyChannel, readyChannel.close]);
}
