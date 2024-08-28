import { createSlice } from '@reduxjs/toolkit';

import { changeThemeMode, initThemeMode } from '@utils/themeUtil';

interface ThemeState {
  mode: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: initThemeMode(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setChangeTheme: (state) => {
      const newMode = state.mode === 'dark' ? 'light' : 'dark';

      state.mode = newMode;
      changeThemeMode(newMode);
    },
  },
});

export const { setChangeTheme } = themeSlice.actions;
export default themeSlice.reducer;
