import { takeEvery } from 'redux-saga/effects';
import { createAccessibilityListener } from './accessibility.listener';
import { AccessibilityChangeEvent } from 'react-native';

function* reduceMotionChangedWorker(event: AccessibilityChangeEvent) {
  console.log('reduceMotion', event);
}

export function* accessibilityReduceMotionChangedSaga() {
  yield takeEvery(
    createAccessibilityListener('reduceMotionChanged'),
    reduceMotionChangedWorker,
  );
}
