import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    // https://wix.github.io/react-native-navigation/docs/app-launch#android
    isInitialized: false,
    isForeground: false,
    isOffline: true,
  },
  reducers: {
    setForeground(state, action) {
      state.isForeground = action.payload;
    },
    setInitialized(state, action) {
      state.isInitialized = action.payload;
    },
    setOffline(state, action) {
      state.isOffline = action.payload;
    },
  },
});

export const {
  reducer,
  actions: { setForeground, setInitialized, setOffline },
} = appSlice;
