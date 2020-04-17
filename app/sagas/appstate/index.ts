import { all, fork } from 'redux-saga/effects';
import { appBlurSaga } from './blur';
import { appFocusSaga } from './focus';
import { appChangeSaga } from './change';

export function* appStateSagas() {
  yield all([fork(appBlurSaga), fork(appFocusSaga), fork(appChangeSaga)]);
}
