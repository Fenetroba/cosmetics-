import express from 'express'
const router = express.Router();

import { register, login, logout, getMe, checkAuth } from '../controller/auth.js';
import { isAuthenticated } from '../middleware/auth.js';

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);
router.post('/logout', logout);

// Get current user
router.get('/me', isAuthenticated, getMe);

// Check authentication status
router.get('/checkauth', isAuthenticated, checkAuth);

export default router; 