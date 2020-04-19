import { combineReducers } from '@reduxjs/toolkit';
import { reducer as appReducer } from './app.slice';
import { reducer as requestReducer } from './request.slice';

export const rootReducer = combineReducers({
  app: appReducer,
  request: requestReducer,
});
