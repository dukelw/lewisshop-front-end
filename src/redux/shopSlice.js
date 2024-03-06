import { createSlice } from '@reduxjs/toolkit';

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shops: {
      newProduct: null,
      isFetching: false,
      error: false,
    },
    shop: {
      foundShop: null,
      isFetching: false,
      error: false,
    },
    findAll: {
      foundShop: null,
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
    updateProductStart: (state) => {
      state.shops.isFetching = true;
    },
    updateProductSuccess: (state) => {
      state.shops.isFetching = false;
    },
    updateProductFailed: (state) => {
      state.shops.isFetching = false;
      state.shops.error = true;
    },
    findShopStart: (state) => {
      state.shop.isFetching = true;
    },
    findShopSuccess: (state, action) => {
      state.shop.isFetching = false;
      state.shop.foundShop = action.payload;
    },
    findShopFailed: (state) => {
      state.shop.isFetching = false;
      state.shop.error = true;
    },
    findAllShopsStart: (state) => {
      state.findAll.isFetching = true;
    },
    findAllShopsSuccess: (state, action) => {
      state.findAll.isFetching = false;
      state.findAll.foundShop = action.payload;
    },
    findAllShopsFailed: (state) => {
      state.findAll.isFetching = false;
      state.findAll.error = true;
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
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,
  findShopStart,
  findShopSuccess,
  findShopFailed,
  findAllShopsStart,
  findAllShopsSuccess,
  findAllShopsFailed,
} = shopSlice.actions;

export default shopSlice.reducer;
