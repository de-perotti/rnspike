import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer, persistStore, PERSIST } from 'redux-persist';
import createSagaMiddleware, { SagaMiddlewareOptions } from 'redux-saga';
import { rootReducer as reducer } from './reducer';
import { REHYDRATE } from 'redux-persist';
import logger from 'redux-logger';
import { rejectedRequest } from './request.slice';

declare const window: undefined | any;

function initializeStore(options?: SagaMiddlewareOptions) {
  const saga = createSagaMiddleware(options);

  const middleware = [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE, rejectedRequest.type],
      },
    }),
    logger,
    saga,
  ];

  const enhancers: any[] = [];

  if (__DEV__) {
    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
      enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }
  }

  const store = {
    ...configureStore({
      middleware,
      reducer: persistReducer(
        {
          key: 'root',
          version: 0,
          whitelist: ['request', 'localization'],
          storage: AsyncStorage,
        },
        reducer,
      ),
      devTools: false,
      enhancers,
    }),
    runSaga: saga.run,
  };

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
}

export const { store, persistor } = initializeStore({
  onError(error, { sagaStack }) {
    console.log('saga.onError', error, sagaStack);
  },
});

export type AppState = ReturnType<typeof store.getState>;
