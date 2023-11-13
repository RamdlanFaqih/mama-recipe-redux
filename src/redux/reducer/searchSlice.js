import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk('search/fetchRecipes', async ({ query, sortOption }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes?search=${query}&sort=${sortOption}`);
      return response.data.message.rows;
    } catch (error) {
      throw error;
    }
  });
  

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchQuery: '',
    sortOption: '',
    recipes: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setInitialSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, setSortOption, setInitialSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
