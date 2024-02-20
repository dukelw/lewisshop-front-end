import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    method: {
      data: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    paymentStart: (state) => {
      state.method.isFetching = true;
    },
    paymentSuccess: (state, action) => {
      state.method.data = action.payload;
    state.method.isFetching = false;
    },
    paymentFailed: (state) => {
      state.method.isFetching = false;
      state.method.error = true;
    },
  },
});

export const { paymentStart, paymentSuccess, paymentFailed } = paymentSlice.actions;

export default paymentSlice.reducer;
