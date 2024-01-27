import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import shopsReducer from './shopSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    shops: shopsReducer,
  },
});
