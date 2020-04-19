import { Platform } from 'react-native';
import { takeEvery } from 'redux-saga/effects';
import { createStateListener } from './state.listener';

function* appFocusWorker() {
  console.log('focused');
}

export function* watchAppFocus() {
  if (Platform.OS === 'android') {
    yield takeEvery(createStateListener('focus'), appFocusWorker);
  }
}
