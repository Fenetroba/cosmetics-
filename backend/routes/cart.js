import express from 'express';
import { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
} from '../Controller/cart.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// All cart routes require authentication
router.use(isAuthenticated);

// Get user's cart
router.get('/', getCart);

// Add item to cart
router.post('/', addToCart);

// Update item quantity
router.put('/:productId', updateCartItem);

// Remove item from cart
router.delete('/:productId', removeFromCart);

// Clear cart
router.delete('/', clearCart);

export default router;
