import { combineReducers } from '@reduxjs/toolkit';
import { reducer as appReducer } from './app.slice';
import { reducer as requestReducer } from './request.slice';
import { reducer as localizationReducer } from './localization.slice';

export const rootReducer = combineReducers({
  app: appReducer,
  request: requestReducer,
  localization: localizationReducer,
});
