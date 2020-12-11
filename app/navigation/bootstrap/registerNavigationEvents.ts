import { Navigation } from 'react-native-navigation';
import { DefaultRoot } from '../roots';
import { registerNavigationTheme } from './registerNavigationTheme';

async function onAppLaunched() {
  registerNavigationTheme();
  await Navigation.setRoot(DefaultRoot);
}

export async function registerNavigationEvents() {
  Navigation.events().registerAppLaunchedListener(onAppLaunched);
}
