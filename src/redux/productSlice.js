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
      console.log('Action payload', action.payload);
      console.log('Recent', state.recentProduct.recentProducts);
      console.log(state.recentProduct.recentProducts.includes(action.payload));
      state.recentProduct.isFetching = false;
      state.recentProduct.recentProducts.push(action.payload);
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
  findRelateProductFailed,
  findRelateProductSuccess,
  findRelateProductStart,
  addRecentProduct,
} = productSlice.actions;

export default productSlice.reducer;
