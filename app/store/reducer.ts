import { combineReducers } from 'redux';
import { appReducer } from './app.duck';

export const rootReducer = combineReducers({
  app: appReducer,
});
