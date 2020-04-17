import { store } from './store';
import { bootstrap as navigationBootstrap } from './navigation/bootstrap/boostrap';
import { rootSaga } from './sagas/root';
import { AppState } from './store/store';

export async function bootstrap() {
  const {
    app: { isInitialized },
  }: AppState = store.getState();

  if (!isInitialized) {
    store.runSaga(rootSaga);
  }

  await navigationBootstrap();
}
