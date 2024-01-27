import { createSlice } from '@reduxjs/toolkit';

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shops: {
      allShops: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getShopsStart: (state) => {
      state.shops.isFetching = true;
    },
    getShopsSuccess: (state, action) => {
      state.shops.isFetching = false;
      state.shops.allShops = action.payload;
    },
    getShopsFailed: (state) => {
      state.shops.isFetching = false;
      state.shops.error = true;
    },
  },
});

export const { getShopsStart, getShopsSuccess, getShopsFailed } = shopSlice.actions;

export default shopSlice.reducer;
