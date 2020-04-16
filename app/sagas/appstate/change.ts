import { AppState as RNAppState } from 'react-native';
import { store } from '../../store';
import { put, takeEvery } from 'redux-saga/effects';
import { setAppState } from '../../store/app.duck';

const SAGA_APP_STATE_CHANGED = '[Saga] App State Changed';

type AppStates = 'active' | 'inactive' | 'background';

function* appChangeWorker({ payload }: { payload: AppStates }) {
  switch (payload) {
    case 'active':
      yield put(setAppState({ isForeground: true }));
      break;

    case 'inactive':
    case 'background':
      yield put(setAppState({ isForeground: false }));
      break;

    default:
      console.log('unexpected payload found:', payload);
      break;
  }
}

export function* appChangeSaga() {
  yield takeEvery<{
    type: typeof SAGA_APP_STATE_CHANGED;
    payload: AppStates;
  }>(SAGA_APP_STATE_CHANGED, appChangeWorker);

  RNAppState.addEventListener('change', (nextAppState) => {
    store.dispatch({ type: SAGA_APP_STATE_CHANGED, payload: nextAppState });
  });
}
