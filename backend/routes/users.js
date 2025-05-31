import { delet_User, Get_All_User, GEt_fav, GetUser_property, UpdateUser, View_Profile } from '../Controller/User.js';

import  express  from 'express';

const router = express.Router();
import { auth, adminAuth } from '../middleware/auth.js';

// Get user profile
router.get('/profile',auth,View_Profile)

// Update user profile
router.put('/profile',auth,UpdateUser)
// Get user's properties
router.get('/properties',auth,GetUser_property),

// Get user's favorite properties
router.get('/favorites',auth,GEt_fav)
// Admin routes
// Get all users (admin only)
router.get('/',adminAuth,Get_All_User ),

// Delete user (admin only)
router.delete('/:id',adminAuth,delet_User)

export default router;