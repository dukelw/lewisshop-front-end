import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    momo: {
      data: null,
      isFetching: false,
      error: false,
    },
    cod: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    momoPaymentStart: (state) => {
      state.momo.isFetching = true;
    },
    momoPaymentSuccess: (state, action) => {
      state.momo.data = action.payload;
      state.momo.isFetching = false;
    },
    momoPaymentFailed: (state) => {
      state.momo.isFetching = false;
      state.momo.error = true;
    },
  },
});

export const { momoPaymentStart, momoPaymentSuccess, momoPaymentFailed } = paymentSlice.actions;

export default paymentSlice.reducer;
