import * as RNLocalize from 'react-native-localize';
import { takeEvery, put } from 'redux-saga/effects';
import { store } from '../store';
import { I18nManager } from 'react-native';
import { fallbackLang, translationGetters } from '../translations';
import { setAppState } from '../store/app.duck';

export function* localizationChangedWorker() {
  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallbackLang;

  I18nManager.forceRTL(isRTL);

  yield put(setAppState({ locale: languageTag }));
}

export function* localizationChangedSaga() {
  const SAGA_I18N_CHANGED = '[Saga] Internationalization Changed';
  yield takeEvery(SAGA_I18N_CHANGED, localizationChangedWorker);

  RNLocalize.addEventListener('change', () => {
    store.dispatch({ type: SAGA_I18N_CHANGED });
  });
}
