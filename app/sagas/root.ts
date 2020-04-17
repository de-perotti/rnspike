import { fork, all, take, put } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';
import { accessibilitySagas } from './accessibility';
import { appStateSagas } from './appstate';
import { setAppState } from '../store/app.duck';

export function* rootSaga() {
  yield put(setAppState({ isForeground: true }));
  yield take(REHYDRATE);
  yield put(setAppState({ isInitialized: true }));
  yield all([fork(appStateSagas), fork(accessibilitySagas)]);
}
