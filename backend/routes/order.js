import express from 'express';
import { 
  getOrders,
  createOrder,
  getOrderById,
  updateOrderStatus,
  removeOrderItem
} from '../Controller/order.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// All order routes require authentication
router.use(isAuthenticated);

// Get user's orders
router.get('/', getOrders);

// Create new order
router.post('/', createOrder);

// Get specific order
router.get('/:id', getOrderById);

// Remove item from order
router.delete('/:orderId/item/:itemId', removeOrderItem);

// Update order status (admin only)
router.patch('/:id/status', updateOrderStatus);

export default router; 