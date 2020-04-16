import { Navigation } from 'react-native-navigation';
import { screens } from '../Screens';

export async function registerScreens() {
  screens.forEach(([name, component, provider]) => {
    Navigation.registerComponent(name, component, provider);
  });
}
