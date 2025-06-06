import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

<<<<<<< HEAD
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
=======
// Async thunks for API calls
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
<<<<<<< HEAD
      console.log('Fetching orders from API...');
      const response = await axios.get('/orders');
      console.log('Orders API response:', response.data);
      
      // Check if the response has the expected structure
      if (!response.data) {
        throw new Error('Invalid response format');
      }

      // Return the orders array, whether it's in data.data or just data
      const orders = response.data.data || response.data;
      console.log('Processed orders:', orders);
      return orders;
    } catch (error) {
      console.error('Error in fetchOrders:', error);
=======
      const response = await axios.get('/orders');
      return response.data.data;
    } catch (error) {
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
      return rejectWithValue(error.response?.data || { message: 'Error fetching orders' });
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/orders', orderData);
<<<<<<< HEAD
      return response.data.data || response.data;
=======
      return response.data.data;
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Error creating order' });
    }
  }
);

<<<<<<< HEAD
export const removeOrderItem = createAsyncThunk(
  'orders/removeOrderItem',
  async ({ orderId, itemId }, { rejectWithValue }) => {
    try {
      console.log('Redux: Removing item:', { orderId, itemId });
      
      // Handle different types of itemId
      let productId;
      if (typeof itemId === 'object' && itemId !== null) {
        if (itemId._id) {
          productId = itemId._id;
        } else if (itemId.toString) {
          productId = itemId.toString();
        } else {
          productId = JSON.stringify(itemId);
        }
      } else {
        productId = String(itemId);
      }
      
      console.log('Redux: Using product ID:', productId);
      
      const response = await axios.delete(`/orders/${orderId}/item/${productId}`);
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
=======
const initialState = {
  orders: [],
  currentOrder: null,
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
<<<<<<< HEAD
=======
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
    }
  },
  extraReducers: (builder) => {
    builder
<<<<<<< HEAD
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        console.log('Fetch orders pending...');
=======
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
<<<<<<< HEAD
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
=======
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error fetching orders';
      })
      // Create Order
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
<<<<<<< HEAD
=======
        state.currentOrder = action.payload;
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error creating order';
<<<<<<< HEAD
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
=======
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
      });
  }
});

<<<<<<< HEAD
export const { clearError } = orderSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders.orders;
=======
export const { clearError, clearCurrentOrder } = orderSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;

export default orderSlice.reducer; 