import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;

// Async thunk for fetching cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/cart', { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
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
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item._id === newItem._id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1
        });
      }
      
      state.totalQuantity += 1;
      state.totalAmount += newItem.price;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item._id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter(item => item._id !== id);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(item => item._id === id);
      
      if (item) {
        const quantityDiff = quantity - item.quantity;
        item.quantity = quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += item.price * quantityDiff;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
        state.totalQuantity = action.payload.totalQuantity;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 