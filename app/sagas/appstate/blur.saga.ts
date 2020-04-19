import { Platform } from 'react-native';
import { takeEvery } from 'redux-saga/effects';
import { createStateListener } from './state.listener';

function* appBlurWorker() {
  console.log('blurred');
}

export function* watchAppBlur() {
  if (Platform.OS === 'android') {
    yield takeEvery(createStateListener('blur'), appBlurWorker);
  }
}
