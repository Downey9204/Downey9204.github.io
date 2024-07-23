import { configureStore } from '@reduxjs/toolkit';

import appReducer from '@store/modules/appSlice';
import themeReducer from '@store/modules/themeSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    theme: themeReducer,
  },
});

export default store;
