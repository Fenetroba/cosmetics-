import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

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

// Async thunks
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching orders from API...');
      const response = await axios.get('/orders');
      console.log('Orders API response:', response.data);
      
      // Check if the response has the expected structure
      if (!response.data) {
        throw new Error('Invalid response format');
      }

      // Return the orders array from the data field
      const orders = response.data.data;
      console.log('Processed orders:', orders);
      
      if (!Array.isArray(orders)) {
        throw new Error('Orders data is not an array');
      }
      
      return orders;
    } catch (error) {
      console.error('Error in fetchOrders:', error);
      return rejectWithValue(error.response?.data || { message: 'Error fetching orders' });
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/orders', orderData);
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
      const response = await axios.delete(`/orders/${orderId}/item/${itemId}`);
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
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        console.log('Fetch orders pending...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        console.log('Fetch orders fulfilled:', action.payload);
        state.loading = false;
        state.orders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        console.log('Fetch orders rejected:', action.payload);
        state.loading = false;
        state.error = action.payload?.message || 'Error fetching orders';
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
  }
});

export const { clearError } = orderSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;

export default orderSlice.reducer; 