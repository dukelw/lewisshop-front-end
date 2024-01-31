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
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailed,
  findProductStart,
  findProductSuccess,
  findProductFailed,
} = productSlice.actions;

export default productSlice.reducer;
