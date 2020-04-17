import { takeEvery } from 'redux-saga/effects';
import { AccessibilityInfo } from 'react-native';
import { store } from '../../store';

function* reduceTransparencyChangedWorker({ payload }: { payload: boolean }) {
  console.log('reduceTransparency', payload);
}

export function* accessibilityReduceTransparencyChangedSaga() {
  const SAGA_REDUCE_TRANSPARENCY_CHANGED = '[Saga] Reduce Transparency Changed';

  yield takeEvery<{
    type: typeof SAGA_REDUCE_TRANSPARENCY_CHANGED;
    payload: boolean;
  }>(SAGA_REDUCE_TRANSPARENCY_CHANGED, reduceTransparencyChangedWorker);

  AccessibilityInfo.addEventListener(
    'reduceTransparencyChanged',
    (newValue) => {
      store.dispatch({
        type: SAGA_REDUCE_TRANSPARENCY_CHANGED,
        payload: newValue,
      });
    },
  );
}
