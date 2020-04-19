import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { eventChannel } from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import { setOffline } from '../../store/app.slice';

function* netInfoWorker({ isConnected, isInternetReachable }: NetInfoState) {
  yield put(setOffline(!isConnected || !isInternetReachable));
}

export function* watchNetInfo() {
  const chan = eventChannel((emit) => {
    // NetInfo.configure({
    //   reachabilityUrl: 'https://clients3.google.com/generate_204',
    //   reachabilityLongTimeout: 60 * 1000, // 60s
    //   reachabilityShortTimeout: 5 * 1000, // 5s
    //   reachabilityRequestTimeout: 15 * 1000, // 15s
    //   reachabilityTest: async (response) => response.status === 204,
    // });

    return NetInfo.addEventListener(emit);
  });

  yield takeEvery(chan, netInfoWorker);
}
