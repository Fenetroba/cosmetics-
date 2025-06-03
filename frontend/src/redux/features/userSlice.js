import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/users/profile', {
        withCredentials: true
      });

      console.log("log",response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put('/users/profile', userData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching user properties
export const fetchUserProperties = createAsyncThunk(
  'user/fetchProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/users/properties', {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching user favorites
export const fetchUserFavorites = createAsyncThunk(
  'user/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/users/favorites', {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  profile: null,
  properties: [],
  favorites: [],
  isLoading: false,
  error: null,
  success: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    resetUserState: (state) => {
      state.profile = null;
      state.properties = [];
      state.favorites = [];
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to fetch profile';
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to update profile';
      })
      // Fetch Properties
      .addCase(fetchUserProperties.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties = action.payload;
        state.success = true;
      })
      .addCase(fetchUserProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to fetch properties';
      })
      // Fetch Favorites
      .addCase(fetchUserFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
        state.success = true;
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to fetch favorites';
      });
  }
});

export const { clearError, clearSuccess, resetUserState } = userSlice.actions;
export default userSlice.reducer; 