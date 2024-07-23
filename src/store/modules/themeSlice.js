import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode:
    sessionStorage.getItem('theme') || sessionStorage.setItem('theme', 'light'),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setChangeTheme: (state) => {
      if (state.mode === 'dark') {
        state.mode = 'light';
        sessionStorage.setItem('theme', 'light');
      } else {
        state.mode = 'dark';
        sessionStorage.setItem('theme', 'dark');
      }
    },
  },
});

export const { setChangeTheme } = themeSlice.actions;
export default themeSlice.reducer;
