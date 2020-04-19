import { put, takeEvery } from 'redux-saga/effects';
import { setForeground } from '../../store/app.slice';
import { createStateListener } from './state.listener';

type AppStates = 'active' | 'inactive' | 'background';

function* appChangeWorker(event: AppStates) {
  switch (event) {
    case 'active':
      yield put(setForeground(true));
      break;

    case 'inactive':
    case 'background':
      yield put(setForeground(false));
      break;

    default:
      console.log('unexpected payload found:', event);
      break;
  }
}

export function* watchAppChange() {
  yield takeEvery(createStateListener('change'), appChangeWorker);
}
