import  jwt  from'jsonwebtoken';
import User  from'../models/User.js';
import env from 'dotenv'
env.config()
export const Registration=async (req, res) => {
     try {
       const { username, email, password, phone } = req.body;
   
       // Check if user already exists
       const existingUser = await User.findOne({ email });
       if (existingUser) {
         return res.status(400).json({ message: 'User already exists' });
       }
   
       // Create new user
       const user = new User({
         username,
         email,
         password,
         phone
       });
   
       await user.save();
   
       // Generate token
       const token = jwt.sign(
         { userId: user._id },
         process.env.JWT_SECRET,
         { expiresIn: '7d' }
       );
   
       res.status(201).json({
         token,
         user: {
           id: user._id,
           username: user.username,
           email: user.email,
           role: user.role
         }
       });
     } catch (error) {
       res.status(500).json({ message: 'Error creating user', error: error.message });
     }
   };
   //LOGIN
   export const Login= async (req, res) => {
     try {
       const { email, password } = req.body;
   
       // Find user
       const user = await User.findOne({ email });
       if (!user) {
         return res.status(401).json({ message: 'Invalid credentials' });
       }
   
       // Check password
       const isMatch = await user.comparePassword(password);
       if (!isMatch) {
         return res.status(401).json({ message: 'Invalid credentials' });
       }
   
       // Generate token
       const token = jwt.sign(
         { userId: user._id },
         process.env.JWT_SECRET,
         { expiresIn: '7d' }
       );
   
       // Set the cookie
       res.cookie('token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
         sameSite: 'strict',
         maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
       });
   
       res.json({
         user: {
           id: user._id,
           email: user.email,
           username: user.username,
           role:user.role
         }
       });
     } catch (error) {
       res.status(500).json({ message: 'Error logging in', error: error.message });
     }
   };
export const Me=async (req, res) => {
     try {
       const user = await User.findById(req.user._id).select('-password');
       res.json(user);
     } catch (error) {
       res.status(500).json({ message: 'Error fetching user', error: error.message });
     }
   }

// Add a check auth status endpoint
export const checkAuth = async (req, res) => {
  try {
    // Check if user exists in request (set by auth middleware)
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authenticated' 
      });
    }

    // Get fresh user data from database
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('CheckAuth Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error checking authentication status' 
    });
  }
};

// In your logout controller
export const logout = (req, res) => {
  res.clearCookie('token');
  return res.json({ 
    success: true,
    message: 'Logged out successfully' 
  });
};