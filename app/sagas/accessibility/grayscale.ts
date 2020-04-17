import { takeEvery } from 'redux-saga/effects';
import { AccessibilityInfo, Platform } from 'react-native';
import { store } from '../../store';

function* grayscaleChangedWorker({ payload }: { payload: boolean }) {
  console.log('grayscale', payload);
}

export function* accessibilityGrayscaleChangedSaga() {
  const SAGA_GRAYSCALE_CHANGED = '[Saga] Grayscale Changed';

  if (Platform.OS === 'ios') {
    yield takeEvery<{
      type: typeof SAGA_GRAYSCALE_CHANGED;
      payload: boolean;
    }>(SAGA_GRAYSCALE_CHANGED, grayscaleChangedWorker);

    AccessibilityInfo.addEventListener('grayscaleChanged', (newValue) => {
      store.dispatch({ type: SAGA_GRAYSCALE_CHANGED, payload: newValue });
    });
  }
}
