import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setChangeTheme: (state) => {
      if (state.mode === 'dark') {
        state.mode = 'light';
      } else {
        state.mode = 'dark';
      }
    },
  },
});

export const { setChangeTheme } = themeSlice.actions;
export default themeSlice.reducer;
