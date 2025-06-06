import express from 'express';
import { 
<<<<<<< HEAD
  getOrders,
  createOrder,
  getOrderById,
  updateOrderStatus,
  removeOrderItem
} from '../Controller/order.js';
import { isAuthenticated } from '../middleware/auth.js';
=======
  getOrders, 
  createOrder, 
  getOrder, 
  updateOrderStatus 
} from '../Controller/order.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf

const router = express.Router();

// All order routes require authentication
router.use(isAuthenticated);

<<<<<<< HEAD
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
=======
// Get all orders for the authenticated user
router.get('/', getOrders);

// Create a new order
router.post('/', createOrder);

// Get single order
router.get('/:id', getOrder);

// Update order status (admin only)
router.put('/:id/status', isAdmin, updateOrderStatus);
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf

export default router; 