import React from 'react';
import { ComponentProvider } from 'react-native';
import { Screen } from './constants';

export const screens: Array<| [string | number, ComponentProvider]
  | [string | number, ComponentProvider, ComponentProvider]
> = [
  [
    Screen.WELCOME,
    () => (props: any) => {
      const { Welcome } = require('../screens/Welcome');

      return <Welcome {...props} />;
    },
    () => require('../screens/Welcome').Welcome,
  ],
];
