import * as RNLocalize from 'react-native-localize';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { I18nManager } from 'react-native';
import { fallbackLang, Languages, translationGetters } from '../translations';
import { setLocale } from '../store/localization.slice';
import { AppState } from '../store/store';

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

  const userDefined = yield select(
    (state: AppState) => state.localization.userDefined,
  );
  if (!userDefined) {
    yield put(setLocale({ locale: languageTag, userDefined: false }));
  }
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
