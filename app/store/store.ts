import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware, { SagaMiddlewareOptions } from 'redux-saga';
import { rootReducer as reducer } from './reducer';

function initializeStore(options?: SagaMiddlewareOptions) {
  const saga = createSagaMiddleware(options);
  const middleware = [logger, saga, ...getDefaultMiddleware()];

  return {
    ...configureStore({
      middleware,
      reducer,
      devTools: process.env.NODE_ENV !== 'production',
    }),
    runSaga: saga.run,
  };
}

export const store = initializeStore();

export type AppState = ReturnType<typeof store.getState>;
