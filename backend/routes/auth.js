import express from 'express'
const router = express.Router();

import { auth } from'../middleware/auth.js';
import { Me, Login, Registration, checkAuth, logout } from '../Controller/Auth.js';

// Register new user
router.post('/register',Registration )

// Login user
router.post('/login',Login)
router.post('/logout',logout)

// Get current user
router.get('/me', auth, Me);
router.get('/checkauth', auth, checkAuth);



export default router; 