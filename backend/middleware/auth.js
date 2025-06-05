import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import env from 'dotenv'
env.config()

export const isAuthenticated = async (req, res, next) => {
  try {
    console.log('Cookies:', req.cookies);
    console.log('Headers:', req.headers);

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      console.log('No token found in request');
      return res.status(401).json({
        success: false,
        message: 'Please login to access this resource'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        console.log('User not found for token');
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      console.log('JWT verification failed:', jwtError.message);
      return res.status(401).json({
        success: false,
        message: 'Invalid token or token expired'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error checking admin status'
    });
  }
};

// Optional: Add a middleware to check if user is logged in without requiring authentication
export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId }).select('-password');
        if (user) {
          req.user = user;
          req.token = token;
        }
      } catch (error) {
        // Token is invalid but we don't want to block the request
        console.log('Optional auth token invalid:', error.message);
      }
    }
    next();
  } catch (error) {
    console.error('Optional Auth Middleware Error:', error);
    next();
  }
};

export default { isAuthenticated, isAdmin, optionalAuth }; 