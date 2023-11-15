import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ITEMS_PER_PAGE = 6; // Uncomment this line
export const fetchRecipes = createAsyncThunk(
  'search/fetchRecipes',
  async ({ query, sortOption, page, limit }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/recipes?search=${query}&sort=${sortOption}&page=${page}&limit=${limit}`
      );
      return response.data;    
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
    totalPages: null
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
        console.log('Action Payload:', action.payload.data.rows); // Tambahkan log ini
        state.status = 'succeeded';
        state.recipes = action.payload.data.rows;
        state.currentPage = action.meta.arg.page;
        state.totalPages = Math.ceil((action.payload.total || 0) / ITEMS_PER_PAGE);
      })
      
      
      
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, setSortOption, setInitialSearchQuery, setCurrentPage } = searchSlice.actions;
export default searchSlice.reducer;
