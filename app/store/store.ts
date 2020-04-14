import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer as reducer } from './reducer';
import logger from 'redux-logger';

function initializeStore() {
  const middleware = [...getDefaultMiddleware(), logger];

  return configureStore({
    middleware,
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export const store = initializeStore();
export type AppState = ReturnType<typeof store.getState>;
