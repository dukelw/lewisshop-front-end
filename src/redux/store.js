import { configureStore } from '@reduxjs/toolkit';
import authShopReducer from './authShopSlice';
import productsReducer from './productSlice';

export default configureStore({
  reducer: {
    authShop: authShopReducer,
    products: productsReducer,
  },
});
