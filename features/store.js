import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './users/userSlice';
import { categorySlice } from './users/categorySlice';

const rootReducer = combineReducers({
  users: userSlice.reducer, // Access the reducer from userSlice
  categories: categorySlice.reducer, // Access the reducer from categorySlice
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
