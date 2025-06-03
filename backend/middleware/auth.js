import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import env from 'dotenv'
env.config()

export const auth = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    const token = req.cookies.token 
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required. No token provided.' 
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: decoded.userId }).select('-password');

      if (!user) {
        return res.status(401).json({ 
          success: false,
          message: 'User not found.' 
        });
      }

      // Attach user and token to request object
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          success: false,
          message: 'Token expired. Please login again.' 
        });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid token. Please login again.' 
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error during authentication.' 
    });
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false,
          message: 'Access denied. Admin privileges required.' 
        });
      }
      next();
    });
  } catch (error) {
    console.error('Admin Auth Middleware Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error during admin authentication.' 
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

export default { auth, adminAuth, optionalAuth }; 