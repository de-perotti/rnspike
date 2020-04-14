import { store } from './store';
import { setAppState } from './store/app.duck';
import { bootstrap as navigationBootstrap } from './navigation/bootstrap/boostrap';

export async function bootstrap() {
  store.dispatch(setAppState({ isInitialized: true, isForeground: true }));
  await navigationBootstrap();
}
