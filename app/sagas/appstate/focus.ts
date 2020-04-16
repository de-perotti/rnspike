import { AppState as RNAppState, Platform } from 'react-native';
import { store } from '../../store';
import { takeEvery } from 'redux-saga/effects';

const SAGA_APP_FOCUSED = '[Saga] App Focused';

function* appFocusWorker() {
  console.log('focused');
}

export function* appFocusSaga() {
  if (Platform.OS === 'android') {
    yield takeEvery(SAGA_APP_FOCUSED, appFocusWorker);

    RNAppState.addEventListener('focus', () => {
      store.dispatch({ type: SAGA_APP_FOCUSED });
    });
  }
}
