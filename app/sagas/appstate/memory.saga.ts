import { takeEvery } from 'redux-saga/effects';
import { createStateListener } from './state.listener';

function* appMemoryWarningWorker() {
  console.log('blurred');
}

export function* watchAppMemoryWarnings() {
  yield takeEvery(createStateListener('memoryWarning'), appMemoryWarningWorker);
}
