import { takeEvery } from 'redux-saga/effects';
import { createAccessibilityListener } from './accessibility.listener';
import { AccessibilityChangeEvent } from 'react-native';

function* screenReaderChangedWorker(event: AccessibilityChangeEvent) {
  console.log('screenReaderChanged', event);
}

export function* accessibilityScreenReaderChangedSaga() {
  yield takeEvery(
    createAccessibilityListener('screenReaderChanged'),
    screenReaderChangedWorker,
  );
}
