import { all, fork } from 'redux-saga/effects';
import { watchAppBlur } from './blur.saga';
import { watchAppFocus } from './focus.saga';
import { watchAppChange } from './change.saga';
import { watchAppMemoryWarnings } from './memory.saga';
export { watchNetInfo } from './netinfo.saga';

export function* watchAppState() {
  yield all([
    fork(watchAppBlur),
    fork(watchAppFocus),
    fork(watchAppChange),
    fork(watchAppMemoryWarnings),
  ]);
}
