import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer, persistStore, PERSIST } from 'redux-persist';
import createSagaMiddleware, { SagaMiddlewareOptions } from 'redux-saga';
import { rootReducer as reducer } from './reducer';

const persistConfig = {
  key: 'root',
  version: 0,
  whitelist: [],
  storage: AsyncStorage,
};

function initializeStore(options?: SagaMiddlewareOptions) {
  const saga = createSagaMiddleware(options);
  const middleware = [
    saga,
    ...getDefaultMiddleware({
      serializableCheck: { ignoredActions: [PERSIST] },
    }),
  ];

  const store = {
    ...configureStore({
      middleware,
      reducer: persistReducer(persistConfig, reducer),
      devTools: process.env.NODE_ENV !== 'production',
    }),
    runSaga: saga.run,
  };

  const persistor = persistStore(store, null);

  return {
    store,
    persistor,
  };
}

export const { store, persistor } = initializeStore();

export type AppState = ReturnType<typeof store.getState>;
