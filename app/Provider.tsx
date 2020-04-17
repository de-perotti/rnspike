import React, { FC } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

export const Provider: FC<any> = ({ children }) => {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </StoreProvider>
  );
};
