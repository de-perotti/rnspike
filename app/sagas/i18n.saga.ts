import * as RNLocalize from 'react-native-localize';
import { takeEvery, putResolve, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { I18nManager } from 'react-native';
import { fallbackLang, Languages, translationGetters } from '../translations';
import { setLocale } from '../store/app.slice';

type LocalizationLanguage = {
  languageTag: Languages;
  isRTL: boolean;
};

function* localizationChangedWorker() {
  const { languageTag, isRTL } =
    (RNLocalize.findBestAvailableLanguage(
      Object.keys(translationGetters),
    ) as LocalizationLanguage) || fallbackLang;

  I18nManager.forceRTL(isRTL);

  yield putResolve(setLocale(languageTag));
}

export function* watchLocalization() {
  const chan = eventChannel((emit) => {
    RNLocalize.addEventListener('change', emit);
    return () => RNLocalize.addEventListener('change', emit);
  });

  // Needs to trigger once
  yield call(localizationChangedWorker);
  yield takeEvery(chan, localizationChangedWorker);
}
