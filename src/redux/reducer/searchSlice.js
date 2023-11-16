import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk(
  'search/fetchRecipes',
  async ({ query, sortOption, page }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/recipes?search=${query}&sort=${sortOption}&page=${page}`
      );
      console.log(response.data.result);
      return response.data.result;    
    } catch (error) {
      throw error;
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchQuery: '',
    sortOption: '',
    recipes: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        console.log(action.payload); // Tambahkan log ini
        const { currentPage, totalPage, result } = action.payload; // Ubah ini
        state.status = 'succeeded';
        state.recipes = result.rows; // Sesuaikan ini
        state.currentPage = currentPage;
        state.totalPages = totalPage;
      })
      
        
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, setSortOption, setInitialSearchQuery, setCurrentPage } = searchSlice.actions;
export default searchSlice.reducer;
