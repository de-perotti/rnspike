import { takeEvery } from 'redux-saga/effects';
import { AccessibilityInfo } from 'react-native';
import { store } from '../../store';

const SAGA_SCREEN_READER_CHANGED = '[Saga] Screen Reader Changed';

function* screenReaderChangedWorker({ payload }: { payload: boolean }) {
  console.log('reduceMotion', payload);
}

export function* accessibilityScreenReaderChangedSaga() {
  yield takeEvery<{
    type: typeof SAGA_SCREEN_READER_CHANGED;
    payload: boolean;
  }>(SAGA_SCREEN_READER_CHANGED, screenReaderChangedWorker);

  AccessibilityInfo.addEventListener('screenReaderChanged', (newValue) => {
    store.dispatch({ type: SAGA_SCREEN_READER_CHANGED, payload: newValue });
  });
}