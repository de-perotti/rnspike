import { all, call, take, put, fork, spawn } from 'redux-saga/effects';
import { channel, buffers } from 'redux-saga';
import { REHYDRATE } from 'redux-persist';
import { watchAccessibility } from './accessibility';
import { watchAppState, watchNetInfo } from './appstate';
import { setInitialized } from '../store/app.slice';
import { setLocale } from '../store/localization.slice';
import { watchLocalization } from './i18n.saga';
import { watchOffline } from './offline';
import { watchRequestReprocess } from './offline/requests.saga';

function* startIndependentWatchers() {
  yield all([
    fork(watchOffline),
    fork(watchAppState),
    fork(watchAccessibility),
  ]);
}

export function* rootSaga() {
  const init = Date.now();

  yield spawn(startIndependentWatchers);

  yield take(REHYDRATE);
  yield fork(watchLocalization);
  yield take(setLocale.type);

  const readyChannel = yield call(channel, buffers.fixed(1));
  yield all([
    fork(watchRequestReprocess, readyChannel),
    fork(watchNetInfo, readyChannel),
  ]);

  yield put(setInitialized(true));

  if (__DEV__) {
    console.log('Took', Date.now() - init, 'ms to start sagas');
  }
}
