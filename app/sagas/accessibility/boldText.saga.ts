import { takeEvery } from 'redux-saga/effects';
import { AccessibilityChangeEvent, Platform } from 'react-native';
import { createAccessibilityListener } from './accessibility.listener';

function* boldTextChangedWorker(event: AccessibilityChangeEvent) {
  console.log('boldTextChanged', event);
}

export function* accessibilityBoldTextChangedSaga() {
  if (Platform.OS === 'ios') {
    yield takeEvery(
      createAccessibilityListener('boldTextChanged'),
      boldTextChangedWorker,
    );
  }
}
