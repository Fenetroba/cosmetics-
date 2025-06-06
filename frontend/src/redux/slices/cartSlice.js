import { createSlice } from '@reduxjs/toolkit';
import { getCookie, setCookie, removeCookie } from '../../lib/cookies';

// Get cart from cookies
const getCartFromCookies = () => {
  const cart = getCookie('cart');
  return cart || { items: [], total: 0 };
};

const initialState = getCartFromCookies();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity
        });
      }

      // Calculate total
      state.total = state.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0
      );

      // Save to cookies
      setCookie('cart', state);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item._id !== productId);
      
      // Recalculate total
      state.total = state.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0
      );

      // Save to cookies
      setCookie('cart', state);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item._id === productId);
      
      if (item) {
        item.quantity = quantity;
        
        // Recalculate total
        state.total = state.items.reduce((total, item) => 
          total + (item.price * item.quantity), 0
        );

        // Save to cookies
        setCookie('cart', state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      
      // Clear cookies
      removeCookie('cart');
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 