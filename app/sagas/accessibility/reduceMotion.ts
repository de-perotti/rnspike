import { takeEvery } from 'redux-saga/effects';
import { AccessibilityInfo } from 'react-native';
import { store } from '../../store';

const SAGA_REDUCE_MOTION_CHANGED = '[Saga] Reduce Motion Changed';

function* reduceMotionChangedWorker({ payload }: { payload: boolean }) {
  console.log('reduceMotion', payload);
}

export function* accessibilityReduceMotionChangedSaga() {
  yield takeEvery<{
    type: typeof SAGA_REDUCE_MOTION_CHANGED;
    payload: boolean;
  }>(SAGA_REDUCE_MOTION_CHANGED, reduceMotionChangedWorker);

  AccessibilityInfo.addEventListener('reduceMotionChanged', (newValue) => {
    store.dispatch({ type: SAGA_REDUCE_MOTION_CHANGED, payload: newValue });
  });
}
