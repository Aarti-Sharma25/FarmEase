// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import rentalReducer from './rentalSlice';

export const store = configureStore({
  reducer: {
    rentals: rentalReducer,
  },
});