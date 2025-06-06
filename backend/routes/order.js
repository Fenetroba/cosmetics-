import express from 'express';
import { 
  getOrders, 
  createOrder, 
  getOrder, 
  updateOrderStatus 
} from '../Controller/order.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// All order routes require authentication
router.use(isAuthenticated);

// Get all orders for the authenticated user
router.get('/', getOrders);

// Create a new order
router.post('/', createOrder);

// Get single order
router.get('/:id', getOrder);

// Update order status (admin only)
router.put('/:id/status', isAdmin, updateOrderStatus);

export default router; 