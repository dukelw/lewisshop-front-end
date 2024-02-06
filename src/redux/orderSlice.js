import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    checkout: {
      checkoutResult: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    checkoutStart: (state) => {
      state.checkout.isFetching = true;
    },
    checkoutSuccess: (state, action) => {
      state.checkout.isFetching = false;
      state.checkout.checkoutResult = action.payload;
    },
    checkoutFailed: (state) => {
      state.checkout.isFetching = false;
      state.checkout.checkoutResult = null;
      state.checkout.error = true;
    },
    // findProductStart: (state) => {
    //   state.order.isFetching = true;
    // },
    // findProductSuccess: (state, action) => {
    //   state.order.isFetching = false;
    //   state.order.foundProduct = action.payload;
    // },
    // findProductFailed: (state) => {
    //   state.order.isFetching = false;
    //   state.order.foundProduct = null;
    //   state.order.error = true;
    // },
  },
});

export const {
  checkoutStart,
  checkoutSuccess,
  checkoutFailed,
  // findProductStart,
  // findProductSuccess,
  // findProductFailed,
} = orderSlice.actions;

export default orderSlice.reducer;
