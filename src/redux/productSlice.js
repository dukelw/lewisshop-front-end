import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: {
      allProducts: null,
      isFetching: false,
      error: false,
    },
    product: {
      foundProduct: null,
      isFetching: false,
      error: false,
    },
    IDsProducts: {
      foundProducts: null,
      isFetching: false,
      error: false,
    },
    relateProduct: {
      relatedProducts: null,
      isFetching: false,
      error: false,
    },
    recentProduct: {
      recentProducts: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getProductsStart: (state) => {
      state.products.isFetching = true;
    },
    getProductsSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.allProducts = action.payload;
    },
    getProductsFailed: (state) => {
      state.products.isFetching = false;
      state.products.allProducts = null;
      state.products.error = true;
    },
    findProductStart: (state) => {
      state.product.isFetching = true;
    },
    findProductSuccess: (state, action) => {
      state.product.isFetching = false;
      state.product.foundProduct = action.payload;
    },
    findProductFailed: (state) => {
      state.product.isFetching = false;
      state.product.foundProduct = null;
      state.product.error = true;
    },
    findProductsStart: (state) => {
      state.IDsProducts.isFetching = true;
    },
    findProductsSuccess: (state, action) => {
      state.IDsProducts.isFetching = false;
      state.IDsProducts.foundProducts = action.payload;
    },
    findProductsFailed: (state) => {
      state.IDsProducts.isFetching = false;
      state.IDsProducts.foundProducts = null;
      state.IDsProducts.error = true;
    },
    findRelateProductStart: (state) => {
      state.relateProduct.isFetching = true;
    },
    findRelateProductSuccess: (state, action) => {
      state.relateProduct.isFetching = false;
      state.relateProduct.relatedProducts = action.payload;
    },
    findRelateProductFailed: (state) => {
      state.relateProduct.isFetching = false;
      state.relateProduct.relatedProducts = null;
      state.relateProduct.error = true;
    },
    addRecentProduct: (state, action) => {
      state.recentProduct.isFetching = false;
      state.recentProduct.recentProducts.push(action.payload);
    },
    resetRecentProduct: (state) => {
      state.recentProduct.isFetching = false;
      state.recentProduct.recentProducts = [];
    },
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailed,
  findProductStart,
  findProductSuccess,
  findProductFailed,
  findProductsStart,
  findProductsSuccess,
  findProductsFailed,
  findRelateProductFailed,
  findRelateProductSuccess,
  findRelateProductStart,
  addRecentProduct,
  resetRecentProduct,
} = productSlice.actions;

export default productSlice.reducer;
