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
    delete: {
      isFetching: false,
      error: false,
    },
    destroy: {
      isFetching: false,
      error: false,
    },
    deleted: {
      deletedDiscounts: null,
      isFetching: false,
      error: false,
    },
    restore: {
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
    findDeletedDiscountsStart: (state) => {
      state.deleted.isFetching = true;
    },
    findDeletedDiscountsSuccess: (state, action) => {
      state.deleted.isFetching = false;
      state.deleted.deletedDiscounts = action.payload;
    },
    findDeletedDiscountsFailed: (state) => {
      state.deleted.isFetching = false;
      state.deleted.deletedDiscounts = null;
      state.deleted.error = true;
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
    restoreDiscountStart: (state) => {
      state.restore.isFetching = true;
    },
    restoreDiscountSuccess: (state) => {
      state.restore.isFetching = false;
    },
    restoreDiscountFailed: (state) => {
      state.restore.isFetching = false;
      state.restore.error = true;
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
    deleteDiscountStart: (state) => {
      state.delete.isFetching = true;
    },
    deleteDiscountSuccess: (state) => {
      state.delete.isFetching = false;
    },
    deleteDiscountFailed: (state) => {
      state.edit.isFetching = false;
      state.edit.error = true;
    },
    destroyDiscountStart: (state) => {
      state.destroy.isFetching = true;
    },
    destroyDiscountSuccess: (state) => {
      state.destroy.isFetching = false;
    },
    destroyDiscountFailed: (state) => {
      state.edit.isFetching = false;
      state.edit.error = true;
    },
  },
});

export const {
  findDiscountsStart,
  findDiscountsSuccess,
  findDiscountsFailed,
  findDeletedDiscountsStart,
  findDeletedDiscountsSuccess,
  findDeletedDiscountsFailed,
  createDiscountStart,
  createDiscountSuccess,
  createDiscountFailed,
  restoreDiscountStart,
  restoreDiscountSuccess,
  restoreDiscountFailed,
  editDiscountStart,
  editDiscountSuccess,
  editDiscountFailed,
  deleteDiscountStart,
  deleteDiscountSuccess,
  deleteDiscountFailed,
  destroyDiscountStart,
  destroyDiscountSuccess,
  destroyDiscountFailed,
} = discountSlice.actions;

export default discountSlice.reducer;
