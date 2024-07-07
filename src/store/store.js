import { configureStore } from '@reduxjs/toolkit';
import appReducer from '@store/modules/appSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
