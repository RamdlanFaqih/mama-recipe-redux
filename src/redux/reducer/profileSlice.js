import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userId = localStorage.getItem("userID")
console.log(userId);

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`
  );
  return response.data;
});

const profileSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "success";
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUserError = (state) => state.users.error;

export default profileSlice.reducer;
