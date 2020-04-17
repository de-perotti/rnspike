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
      const { Welcome } = require('../screens/Welcome');

      return (
        <Provider>
          <Welcome {...props} />
        </Provider>
      );
    },
    () => require('../screens/Welcome').Welcome,
  ],
];
