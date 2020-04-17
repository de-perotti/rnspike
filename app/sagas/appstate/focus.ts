import { AppState as RNAppState, Platform } from 'react-native';
import { store } from '../../store';
import { takeEvery } from 'redux-saga/effects';

function* appFocusWorker() {
  console.log('focused');
}

export function* appFocusSaga() {
  const SAGA_APP_FOCUSED = '[Saga] App Focused';

  if (Platform.OS === 'android') {
    yield takeEvery(SAGA_APP_FOCUSED, appFocusWorker);

    RNAppState.addEventListener('focus', () => {
      store.dispatch({ type: SAGA_APP_FOCUSED });
    });
  }
}
