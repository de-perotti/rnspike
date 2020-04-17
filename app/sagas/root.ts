import { call, fork, all, take, put } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';
import { accessibilitySagas } from './accessibility';
import { appStateSagas } from './appstate';
import { setAppState } from '../store/app.duck';
import { localizationChangedSaga, localizationChangedWorker } from './i18n';

export function* rootSaga() {
  yield put(setAppState({ isForeground: true }));
  yield all([call(localizationChangedWorker), take(REHYDRATE)]);
  yield put(setAppState({ isInitialized: true }));
  yield all([
    fork(localizationChangedSaga),
    fork(appStateSagas),
    fork(accessibilitySagas),
  ]);
}
