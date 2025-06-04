import express from 'express';
import { 
  getUsers, 
  getUser, 
  updateUser, 
  deleteUser 
} from '../Controller/user.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.use(isAuthenticated);

// Admin only routes
router.get('/', isAdmin, getUsers);
router.get('/:id', isAdmin, getUser);
router.put('/:id', isAdmin, updateUser);
router.delete('/:id', isAdmin, deleteUser);

export default router;