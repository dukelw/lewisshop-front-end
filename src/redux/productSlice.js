import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: {
      allProducts: null,
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
  },
});

export const { getProductsStart, getProductsSuccess, getProductsFailed } = productSlice.actions;

export default productSlice.reducer;
