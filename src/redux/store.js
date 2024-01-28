import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productsReducer from './productSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});
