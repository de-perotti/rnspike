import App from '../App';
import { ComponentProvider } from 'react-native';
import { Screen } from './constants';

export const screens: Array<
  | [string | number, ComponentProvider]
  | [string | number, ComponentProvider, ComponentProvider]
> = [[Screen.WELCOME, () => App]];
