import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authSlice';
import registerSlice from './reducer/registerSlice';
import searchSlice from './reducer/searchSlice';
// import profileSlice from './reducer/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerSlice,
    search: searchSlice
  },
});
