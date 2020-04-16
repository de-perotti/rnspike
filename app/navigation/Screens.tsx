import React from 'react';
import { ComponentProvider } from 'react-native';
import { Screen } from './constants';
import { Provider } from '../Provider';

export const screens: Array<
  | [string | number, ComponentProvider]
  | [string | number, ComponentProvider, ComponentProvider]
> = [
  [
    Screen.WELCOME,
    () => (props: any) => {
      const { App } = require('../screens/App');
      return (
        <Provider>
          <App {...props} />
        </Provider>
      );
    },
    () => require('../screens/App').App,
  ],
];
