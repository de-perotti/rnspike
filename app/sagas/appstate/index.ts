import { all } from 'redux-saga/effects';
import { appBlurSaga } from './blur';
import { appFocusSaga } from './focus';
import { appChangeSaga } from './change';

export function* appStateSagas() {
  yield all([appBlurSaga(), appFocusSaga(), appChangeSaga()]);
}
