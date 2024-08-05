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
    updateInfo: {
      updatedShop: null,
      isFetching: false,
      error: false,
    },
    changePassword: {
      isFetching: false,
      error: false,
    },
    search: {
      matchedShops: [],
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
    updateShopInfoStart: (state) => {
      state.updateInfo.isFetching = true;
    },
    updateShopInfoSuccess: (state, action) => {
      state.updateInfo.isFetching = false;
      state.updateInfo.updatedShop = action.payload;
      state.updateInfo.error = false;
    },
    updateShopInfoFailure: (state) => {
      state.updateInfo.isFetching = false;
      state.updateInfo.error = true;
    },
    changeShopPasswordStart: (state) => {
      state.changePassword.isFetching = true;
    },
    changeShopPasswordSuccess: (state) => {
      state.changePassword.isFetching = false;
      state.changePassword.error = false;
    },
    changeShopPasswordFailure: (state) => {
      state.changePassword.isFetching = false;
      state.changePassword.error = true;
    },
    searchShopStart: (state) => {
      state.search.isFetching = true;
    },
    searchShopSuccess: (state, action) => {
      state.search.isFetching = false;
      state.search.matchedShops = action.payload;
    },
    searchShopFailed: (state) => {
      state.search.isFetching = false;
      state.search.matchedShops = null;
      state.search.error = true;
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
  updateShopInfoStart,
  updateShopInfoSuccess,
  updateShopInfoFailure,
  changeShopPasswordStart,
  changeShopPasswordSuccess,
  changeShopPasswordFailure,
  searchShopStart,
  searchShopSuccess,
  searchShopFailed,
} = shopSlice.actions;

export default shopSlice.reducer;
