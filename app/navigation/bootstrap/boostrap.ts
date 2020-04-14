import { registerScreens } from './registerScreens';
import { registerNavigationEvents } from './registerNavigationEvents';

export async function bootstrap() {
  await registerScreens();
  await registerNavigationEvents();
}
