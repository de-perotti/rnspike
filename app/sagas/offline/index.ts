import { all, fork } from 'redux-saga/effects';
import { watchRequests } from './requests.saga';

export function* watchOffline() {
  yield all([fork(watchRequests)]);
}
