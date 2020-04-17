import React from 'react';
import { ComponentProvider } from 'react-native';
import { Screen } from './constants';
import { AppProvider } from '../AppProvider';

export const screens: Array<
  | [string | number, ComponentProvider]
  | [string | number, ComponentProvider, ComponentProvider]
> = [
  [
    Screen.WELCOME,
    () => (props: any) => {
      const { Welcome } = require('../screens/Welcome');

      return (
        <AppProvider>
          <Welcome {...props} />
        </AppProvider>
      );
    },
    () => require('../screens/Welcome').Welcome,
  ],
];
