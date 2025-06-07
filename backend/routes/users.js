import express from 'express';
import { 
  getUsers, 
  getUser, 
  updateUser, 
  deleteUser,
  View_Profile,
  UpdateUser
} from '../Controller/User.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.use(isAuthenticated);

// Admin only routes
router.get('/', isAdmin, getUsers);

// Profile routes (must come before /:id routes)
router.get('/profile', View_Profile);
router.put('/profile', UpdateUser);

// Parameterized routes
router.get('/:id', isAdmin, getUser);
router.put('/:id', isAdmin, updateUser);
router.delete('/:id', isAdmin, deleteUser);

export default router;
