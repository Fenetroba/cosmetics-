import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Test order data
const testOrder = {
  _id: 'test-order-1',
  createdAt: new Date().toISOString(),
  status: 'completed',
  items: [
    {
      _id: 'test-item-1',
      name: 'Test Product',
      price: 29.99,
      quantity: 2,
      image: 'https://via.placeholder.com/150'
    }
  ],
  totalAmount: 59.98
};

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

// Async thunks
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/orders');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return rejectWithValue(error.response?.data?.message || 'Error fetching orders');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, { status });
      return response.data.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      return rejectWithValue(error.response?.data?.message || 'Error updating order status');
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Error creating order' });
    }
  }
);

export const removeOrderItem = createAsyncThunk(
  'orders/removeOrderItem',
  async ({ orderId, itemId }, { rejectWithValue }) => {
    try {
      console.log('Redux: Removing item:', { orderId, itemId });
      
      // Ensure we're using the correct item ID
      const response = await api.delete(`/orders/${orderId}/item/${itemId}`);
      console.log('Redux: Remove item response:', response.data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to remove item');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Redux: Error removing item:', error);
      return rejectWithValue(error.response?.data || { message: 'Error removing item from order' });
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error creating order';
      })
      // Remove order item
      .addCase(removeOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeOrderItem.fulfilled, (state, action) => {
        console.log('Remove item fulfilled:', action.payload);
        state.loading = false;
        if (action.payload === null) {
          // If the order was deleted (no items left)
          state.orders = state.orders.filter(order => order._id !== action.meta.arg.orderId);
        } else {
          // Update the order in the state
          state.orders = state.orders.map(order =>
            order._id === action.payload._id ? action.payload : order
          );
        }
      })
      .addCase(removeOrderItem.rejected, (state, action) => {
        console.log('Remove item rejected:', action.payload);
        state.loading = false;
        state.error = action.payload?.message || 'Error removing item from order';
      });
  },
});

export const { clearError } = orderSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;

export default orderSlice.reducer; 