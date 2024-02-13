import { createSlice } from '@reduxjs/toolkit';

const discountSlice = createSlice({
  name: 'discount',
  initialState: {
    discounts: {
      foundDiscounts: null,
      isFetching: false,
      error: false,
    },
    create: {
      newDiscount: null,
      isFetching: false,
      error: false,
    },
    edit: {
      updatedDiscount: null,
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
    createDiscountStart: (state) => {
      state.create.isFetching = true;
    },
    createDiscountSuccess: (state, action) => {
      state.create.isFetching = false;
      state.create.newDiscount = action.payload;
    },
    createDiscountFailed: (state) => {
      state.create.isFetching = false;
      state.create.newDiscount = null;
      state.create.error = true;
    },
    editDiscountStart: (state) => {
      state.edit.isFetching = true;
    },
    editDiscountSuccess: (state, action) => {
      state.edit.isFetching = false;
      state.edit.updatedDiscount = action.payload;
    },
    editDiscountFailed: (state) => {
      state.edit.isFetching = false;
      state.edit.updatedDiscount = null;
      state.edit.error = true;
    },
  },
});

export const {
  findDiscountsStart,
  findDiscountsSuccess,
  findDiscountsFailed,
  createDiscountStart,
  createDiscountSuccess,
  createDiscountFailed,
  editDiscountStart,
  editDiscountSuccess,
  editDiscountFailed,
} = discountSlice.actions;

export default discountSlice.reducer;
