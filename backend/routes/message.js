import express from 'express';
import { 
  getMessages,
  sendMessage,
  markAsRead,
  deleteMessage
} from '../Controller/message.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// All message routes require authentication
router.use(isAuthenticated);

// Get all messages
router.get('/', getMessages);

// Send a new message
router.post('/', sendMessage);

// Mark message as read
router.patch('/:id/read', markAsRead);

// Delete message
router.delete('/:id', deleteMessage);

export default router; 