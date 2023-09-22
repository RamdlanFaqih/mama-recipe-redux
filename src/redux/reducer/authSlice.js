import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
    },
    logoutSuccess: state => {
      state.token = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;