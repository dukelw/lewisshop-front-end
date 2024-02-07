import { createSlice } from '@reduxjs/toolkit';

const discountSlice = createSlice({
  name: 'discount',
  initialState: {
    discounts: {
      foundDiscounts: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    findDiscountsStart: (state) => {
      state.discounts.isFetching = true;
    },
    findDiscountsSuccess: (state, action) => {
      state.discounts.isFetching = false;
      state.discounts.foundDiscounts = action.payload;
    },
    findDiscountsFailed: (state) => {
      state.discounts.isFetching = false;
      state.discounts.foundDiscounts = null;
      state.discounts.error = true;
    },
  },
});

export const { findDiscountsStart, findDiscountsSuccess, findDiscountsFailed } = discountSlice.actions;

export default discountSlice.reducer;
