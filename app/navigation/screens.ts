import App from '../screens/App';
import AppClone from '../screens/AppClone';
import { ComponentProvider } from 'react-native';
import { Screen } from './constants';
import { SideMenu } from '../screens/SideMenu';

export const screens: Array<
  | [string | number, ComponentProvider]
  | [string | number, ComponentProvider, ComponentProvider]
> = [
  [Screen.WELCOME, () => App],
  [Screen.SIDE_MENU, () => SideMenu],
  [Screen.WELCOME_2, () => AppClone],
];
