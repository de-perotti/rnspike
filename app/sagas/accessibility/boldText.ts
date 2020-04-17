import { takeEvery } from 'redux-saga/effects';
import { AccessibilityInfo, Platform } from 'react-native';
import { store } from '../../store';

const SAGA_BOLD_TEXT_CHANGED = '[Saga] Bold Text Changed';

function* boldTextChangedWorker({ payload }: { payload: boolean }) {
  console.log('boldTextChanged', payload);
}

export function* accessibilityBoldTextChangedSaga() {
  if (Platform.OS === 'ios') {
    yield takeEvery<{
      type: typeof SAGA_BOLD_TEXT_CHANGED;
      payload: boolean;
    }>(SAGA_BOLD_TEXT_CHANGED, boldTextChangedWorker);

    AccessibilityInfo.addEventListener('boldTextChanged', (newValue) => {
      store.dispatch({ type: SAGA_BOLD_TEXT_CHANGED, payload: newValue });
    });
  }
}