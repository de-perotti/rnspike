import { all, take, put, fork } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';
import { watchAccessibility } from './accessibility';
import { watchAppState } from './appstate';
import { setInitialized, setOffline, setLocale } from '../store/app.slice';
import { watchLocalization } from './i18n.saga';
import { watchOffline } from './offline';
import { watchRequestReprocess } from './offline/requests.saga';

export function* rootSaga() {
  const init = Date.now();

  yield all([
    fork(watchOffline),
    fork(watchLocalization),
    fork(watchAppState),
    fork(watchAccessibility),
  ]);

  yield all([take(REHYDRATE), take(setOffline.type), take(setLocale.type)]);

  yield all([fork(watchRequestReprocess), put(setInitialized(true))]);

  if (__DEV__) {
    console.log('Took', Date.now() - init, 'ms to start sagas');
  }
}
