import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store';

export const Provider = (props: any) => {
  return <StoreProvider {...props} store={store} />;
};
