import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fallbackLang, Languages } from '../translations';

const initialState: {
  locale: Languages;
  userDefined: boolean;
} = {
  locale: fallbackLang.languageTag,
  userDefined: false,
};

const localizationSlice = createSlice({
  name: 'localization',
  initialState,
  reducers: {
    setLocale(
      state,
      action: PayloadAction<{ locale: Languages; userDefined: boolean }>,
    ) {
      state.locale = action.payload.locale;
      state.userDefined = action.payload.userDefined;
    },
  },
});

export const {
  reducer,
  actions: { setLocale },
} = localizationSlice;
