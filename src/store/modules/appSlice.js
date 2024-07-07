import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

const initialState = {};

const setLoading = (state, action) => {
  console.log('Loading...');
};
const setFailed = (state, action) => {
  console.log('Failed...');
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const actions = [];

    actions.forEach(([action, reducer]) => {
      builder.addCase(action, reducer);
    });

    builder.addMatcher(isPending(), setLoading);
    builder.addMatcher(isRejected(), setFailed);
  },
});

export const {} = appSlice.actions;
export default appSlice.reducer;
