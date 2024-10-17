import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './users/userSlice';
import { categorySlice } from './users/categorySlice';
import { productSlice } from './users/productSlice';

const rootReducer = combineReducers({
  users: userSlice.reducer, // Access the reducer from userSlice
  categories: categorySlice.reducer, // Access the reducer from categorySlice
  products: productSlice.reducer, // Access the reducer from categorySlice
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
