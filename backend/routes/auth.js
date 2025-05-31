import express from 'express'
const router = express.Router();

import { auth } from'../middleware/auth.js';
import { Me, Login, Registration } from '../Controller/Auth.js';

// Register new user
router.post('/register',Registration )

// Login user
router.post('/login',Login)

// Get current user
router.get('/me', auth, Me);

export default router; 