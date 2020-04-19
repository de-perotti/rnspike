import { takeEvery } from 'redux-saga/effects';
import { AccessibilityChangeEvent, Platform } from 'react-native';
import { createAccessibilityListener } from './accessibility.listener';

function* grayscaleChangedWorker(event: AccessibilityChangeEvent) {
  console.log('grayscale', event);
}

export function* accessibilityGrayscaleChangedSaga() {
  if (Platform.OS === 'ios') {
    yield takeEvery(
      createAccessibilityListener('grayscaleChanged'),
      grayscaleChangedWorker,
    );
  }
}
