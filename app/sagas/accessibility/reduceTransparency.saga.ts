import { takeEvery } from 'redux-saga/effects';
import { createAccessibilityListener } from './accessibility.listener';
import { AccessibilityChangeEvent } from 'react-native';

function* reduceTransparencyChangedWorker(event: AccessibilityChangeEvent) {
  console.log('reduceTransparency', event);
}

export function* accessibilityReduceTransparencyChangedSaga() {
  yield takeEvery(
    createAccessibilityListener('reduceTransparencyChanged'),
    reduceTransparencyChangedWorker,
  );
}
