import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios.js';

// Helper function to ensure cart exists
const ensureCart = async () => {
  try {
    await axios.get('/cart');
  } catch (error) {
    console.error('Error ensuring cart exists:', error);
  }
};

// Async thunks for API calls
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/cart');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Error fetching cart' });
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      await ensureCart();
      const response = await axios.post('/cart', { productId, quantity });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Error adding to cart' });
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      // First ensure cart exists
      await ensureCart();
      
      // Log the request details
      console.log('Updating cart item:', { productId, quantity });
      
      // Make the update request
      const response = await axios.put(`/cart/${productId}`, { quantity });
      
      // Log the response
      console.log('Update cart response:', response.data);
      
      return response.data.data;
    } catch (error) {
      // Log the full error details
      console.error('Error updating cart:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      // Return a more detailed error message
      return rejectWithValue({
        message: error.response?.data?.message || 'Error updating cart',
        status: error.response?.status,
        details: error.response?.data
      });
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      await ensureCart();
      const response = await axios.delete(`/cart/${productId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Error removing from cart' });
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await ensureCart();
      const response = await axios.delete('/cart');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Error clearing cart' });
    }
  }
);

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items || [];
        state.totalAmount = action.payload.totalAmount || 0;
        state.totalQuantity = action.payload.totalQuantity || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error fetching cart';
      })
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items || [];
        state.totalAmount = action.payload.totalAmount || 0;
        state.totalQuantity = action.payload.totalQuantity || 0;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error adding to cart';
      })
      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items || [];
        state.totalAmount = action.payload.totalAmount || 0;
        state.totalQuantity = action.payload.totalQuantity || 0;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error updating cart';
      })
      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items || [];
        state.totalAmount = action.payload.totalAmount || 0;
        state.totalQuantity = action.payload.totalQuantity || 0;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error removing from cart';
      })
      // Clear cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
        state.totalAmount = 0;
        state.totalQuantity = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error clearing cart';
      });
  }
});

export const { clearError } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;

export default cartSlice.reducer; 