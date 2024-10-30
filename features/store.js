import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';
import { categorySlice } from './slices/categorySlice';
import { productSlice } from './slices/productSlice';
import { orderSlice } from './slices/orderSlice';
import { cartSlice } from './slices/cartSlice'; // Add your cart slice here
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Persist configuration for cart slice
const cartPersistConfig = {
  key: 'cart', // The key in localStorage
  storage, // Using localStorage
};

// Wrap cart reducer with persistReducer
const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice.reducer);

// Combine reducers
const rootReducer = combineReducers({
  users: userSlice.reducer,
  categories: categorySlice.reducer,
  products: productSlice.reducer,
  cart: persistedCartReducer, // Persisted cart slice
  orders: orderSlice.reducer, // Persisted cart slice
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Export persistor
export const persistor = persistStore(store);

export default store;
