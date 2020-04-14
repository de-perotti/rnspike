import { AnyAction, Action } from 'redux';

const APP_SET_STATE = '[APP] Set State';

type State = {
  isInitialized: boolean;
  isForeground: boolean;
};

const initialState: State = {
  // https://wix.github.io/react-native-navigation/docs/app-launch#android
  isInitialized: false,
  isForeground: false,
};

export function appReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case APP_SET_STATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export function setAppState(state: Partial<State>): AnyAction {
  return {
    type: APP_SET_STATE,
    payload: state,
  };
}
