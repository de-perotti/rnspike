import { takeEvery } from 'redux-saga/effects';
import { AccessibilityChangeEvent, Platform } from 'react-native';
import { createAccessibilityListener } from './accessibility.listener';

function* invertColorsChangedWorker(event: AccessibilityChangeEvent) {
  console.log('invertColors', event);
}

export function* accessibilityInvertColorsChangedSaga() {
  if (Platform.OS === 'ios') {
    yield takeEvery(
      createAccessibilityListener('invertColorsChanged'),
      invertColorsChangedWorker,
    );
  }
}
