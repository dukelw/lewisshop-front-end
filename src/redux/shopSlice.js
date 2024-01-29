import { createSlice } from '@reduxjs/toolkit';

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shops: {
      newProduct: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    createProductStart: (state) => {
      state.shops.isFetching = true;
    },
    createProductSuccess: (state, action) => {
      state.shops.isFetching = false;
      state.shops.newProduct = action.payload;
    },
    createProductFailed: (state) => {
      state.shops.isFetching = false;
      state.shops.error = true;
    },
    publishProductStart: (state) => {
      state.shops.isFetching = true;
    },
    publishProductSuccess: (state) => {
      state.shops.isFetching = false;
    },
    publishProductFailed: (state) => {
      state.shops.isFetching = false;
      state.shops.error = true;
    },
    unpublishProductStart: (state) => {
      state.shops.isFetching = true;
    },
    unpublishProductSuccess: (state) => {
      state.shops.isFetching = false;
    },
    unpublishProductFailed: (state) => {
      state.shops.isFetching = false;
      state.shops.error = true;
    },
  },
});

export const {
  createProductStart,
  createProductSuccess,
  createProductFailed,
  publishProductStart,
  publishProductSuccess,
  publishProductFailed,
  unpublishProductStart,
  unpublishProductSuccess,
  unpublishProductFailed,
} = shopSlice.actions;

export default shopSlice.reducer;
