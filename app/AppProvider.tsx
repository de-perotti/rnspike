import React, { FC } from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { Provider as StoreProvider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { AppState } from './store/store';
import { translationGetters } from './translations';

const IntlProvider: FC<any> = ({ children }) => {
  const locale = useSelector((state: AppState) => state.localization.locale);

  return (
    <ReactIntlProvider
      locale={locale}
      key={locale}
      messages={translationGetters[locale]()}
    >
      {children}
    </ReactIntlProvider>
  );
};

export const AppProvider: FC<any> = ({ children }) => {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>
        <IntlProvider>{children}</IntlProvider>
      </PersistGate>
    </StoreProvider>
  );
};
