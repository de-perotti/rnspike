import { createSlice } from '@reduxjs/toolkit';
import { fallbackLang } from '../translations';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    // https://wix.github.io/react-native-navigation/docs/app-launch#android
    isInitialized: false,
    isForeground: false,
    isOffline: true,
    locale: fallbackLang.languageTag,
  },
  reducers: {
    setForeground(state, action) {
      state.isForeground = action.payload;
    },
    setInitialized(state, action) {
      state.isInitialized = action.payload;
    },
    setLocale(state, action) {
      state.locale = action.payload;
    },
    setOffline(state, action) {
      state.isOffline = action.payload;
    },
  },
});

export const {
  reducer,
  actions: { setForeground, setInitialized, setLocale, setOffline },
} = appSlice;
