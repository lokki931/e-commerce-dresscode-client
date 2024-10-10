import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './users/userSlice'; // Assuming userSlice is correctly defined in this file

const rootReducer = combineReducers({
  users: userSlice.reducer, // Access the reducer from userSlice
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
