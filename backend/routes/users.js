import express from 'express';
import { 
  getUsers, 
  getUser, 
  updateUser, 
  deleteUser,
  View_Profile,
  UpdateUser
} from '../Controller/User.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.use(isAuthenticated);

// User routes
router.get('/', getUsers);

// Profile routes (must come before /:id routes)
router.get('/profile', View_Profile);
router.put('/profile', UpdateUser);

// Parameterized routes
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
