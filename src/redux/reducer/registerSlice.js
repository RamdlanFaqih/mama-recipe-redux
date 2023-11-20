import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const resetRegisterState = createAction("Register/resetRegisterState");

export const registerAction = createAsyncThunk(
  "Register/registerUsers",
  async ({ data, navigate }, { rejectWithValue, dispatch }) => {
    try {
      if (
        data.name === "" ||
        data.email_address === "" ||
        data.phone_number === "" ||
        data.password === ""
      ) {
        throw new Error("Input is empty");
      }

      const userData = {
        name: data.name,
        email_address: data.email_address,
        phone_number: data.phone_number,
        password: data.password,
      };

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        userData
      );

      return { navigate };
    } catch (error) {
      return rejectWithValue("Register Failed");
    }
  }
);

const registerSlice = createSlice({
  name: "registerUsers",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(resetRegisterState, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
      state.successMessage = "";
    });
    builder.addCase(registerAction.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.successMessage = "Registration Succesful!";
      console.log(action.payload);
      action.payload.navigate("/login");
    });

    builder.addCase(registerAction.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload || "An error occurred";
    });
  },
});
export default registerSlice.reducer;
