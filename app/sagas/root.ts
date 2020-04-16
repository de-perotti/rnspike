import { all } from 'redux-saga/effects';
import { accessibilitySagas } from './accessibility';
import { appStateSagas } from './appstate';

export function* rootSaga() {
  yield all([appStateSagas(), accessibilitySagas()]);
}
