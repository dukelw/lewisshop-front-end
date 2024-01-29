import { configureStore } from '@reduxjs/toolkit';
import authShopReducer from './authShopSlice';
import productsReducer from './productSlice';
import shopReducer from './shopSlice';

export default configureStore({
  reducer: {
    authShop: authShopReducer,
    products: productsReducer,
    shop: shopReducer,
  },
});
