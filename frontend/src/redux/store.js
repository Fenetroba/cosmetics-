import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import cartReducer from './features/cartSlice';
import orderReducer from './features/orderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
<<<<<<< HEAD
    orders: orderReducer,
=======
    orders: orderReducer
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store; 