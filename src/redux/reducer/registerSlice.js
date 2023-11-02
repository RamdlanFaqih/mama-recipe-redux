import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const registerAction = createAsyncThunk(
    "Register/registerUsers",
    async ({data}, {rejectWithValue, dispatch}) => {
        try  {
            if (
                data.name === "" ||
                data.email_address === "" ||
                data.phone_number === "" ||
                data.password === ""
            ) {
                return rejectWithValue("Input is empty")
            }
            const userData = {
                name: data.name,
                email_address: data.email_address,
                phone_number: data.phone_number,
                password: data.password,
            };

            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, userData)

        } catch (error) {
            return rejectWithValue("Add Recipe Error");
        }
    },  
);

const registerSlice = createSlice( {
    name: "registerUsers",
    initialState: {
        isLoading: false,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(registerAction.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(registerAction.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(registerAction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action?.payload
        })
    }
})

export default registerSlice.reducer;