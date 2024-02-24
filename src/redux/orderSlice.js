import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    checkout: {
      checkoutResult: null,
      isFetching: false,
      error: false,
    },
    orders: {
      allOrder: null,
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
    findOrdersStart: (state) => {
      state.orders.isFetching = true;
    },
    findOrdersSuccess: (state, action) => {
      state.orders.isFetching = false;
      state.orders.allOrder = action.payload;
    },
    findOrdersFailed: (state) => {
      state.orders.isFetching = false;
      state.orders.allOrder = null;
      state.orders.error = true;
    },
  },
});

export const { checkoutStart, checkoutSuccess, checkoutFailed, findOrdersStart, findOrdersSuccess, findOrdersFailed } =
  orderSlice.actions;

export default orderSlice.reducer;
