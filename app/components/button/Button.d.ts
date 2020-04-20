import { Button as AndroidButton } from './Button.android';
import { Button as IosButton } from './Button.ios';
import { Platform } from 'react-native';

export declare const Button: typeof Platform.OS extends 'ios'
  ? typeof IosButton
  : typeof AndroidButton;
