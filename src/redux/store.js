import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authShopReducer from './authShopSlice';
import authUserReducer from './authUserSlice';
import productsReducer from './productSlice';
import shopReducer from './shopSlice';
import orderReducer from './orderSlice';
import discountReducer from './discountSlice';
import toastReducer from './toastSlice';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  authShop: authShopReducer,
  authUser: authUserReducer,
  products: productsReducer,
  shop: shopReducer,
  order: orderReducer,
  discount: discountReducer,
  toast: toastReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
