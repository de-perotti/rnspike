import { eventChannel } from 'redux-saga';
import { AppState as RNAppState, AppStateEvent } from 'react-native';

export function createStateListener(eventName: AppStateEvent) {
  return eventChannel((emit) => {
    RNAppState.addEventListener(eventName, emit);
    return () => RNAppState.removeEventListener(eventName, emit);
  });
}
