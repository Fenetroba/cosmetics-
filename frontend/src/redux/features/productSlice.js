import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

// Async thunk for creating a product
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/products', productData);
      return response.data.data; // Return the product data from the response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to create product' });
    }
  }
);

// Async thunk for updating a product
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/products/${id}`, productData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update product' });
    }
  }
);

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/products');
      return response.data.data; // Return the products array from the response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch products' });
    }
  }
);

// Async thunk for deleting a product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const user = state.auth.user;
      const token = state.auth.token;
      
      // Check if user exists and has admin role
      if (!user || user.role !== 'admin') {
        return rejectWithValue({ message: 'Only administrators can delete products' });
      }

      // Check if token exists
      if (!token) {
        return rejectWithValue({ message: 'Authentication token is missing' });
      }

      const response = await axios.delete(`/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      return productId; // Return the deleted product ID
    } catch (error) {
      console.error('Delete error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: 'Failed to delete product' });
    }
  }
);

// Async thunk for uploading image to Cloudinary
export const uploadImage = createAsyncThunk(
  'products/uploadImage',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data; // Return the upload data from the response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to upload image' });
    }
  }
);

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  success: false,
  uploadStatus: {
    loading: false,
    error: null
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.uploadStatus.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to create product';
      })
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.success = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to fetch products';
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(product => product._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to delete product';
      })
      // Upload Image
      .addCase(uploadImage.pending, (state) => {
        state.uploadStatus.loading = true;
        state.uploadStatus.error = null;
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.uploadStatus.loading = false;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploadStatus.loading = false;
        state.uploadStatus.error = action.payload?.message || 'Failed to upload image';
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(product => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to update product';
      });
  },
});

export const { clearError, clearSuccess } = productSlice.actions;
export default productSlice.reducer; 