import User from "../models/User.js";
import Property from "../models/Property.js";

export const View_Profile = async (req, res) => {
  try {
    // Check if user exists in request (set by auth middleware)
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not authenticated' 
      });
    }

    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('favorites');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        favorites: user.favorites
      }
    });
  } catch (error) {
    console.error('View Profile Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching profile', 
      error: error.message 
    });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not authenticated' 
      });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'phone'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid updates' 
      });
    }

    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();

    res.json({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role
      }
    });
  } catch (error) {
    console.error('Update User Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating profile', 
      error: error.message 
    });
  }
};

export const GetUser_property = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not authenticated' 
      });
    }

    const properties = await Property.find({ owner: req.user._id });
    res.json({
      success: true,
      properties
    });
  } catch (error) {
    console.error('Get User Properties Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching properties', 
      error: error.message 
    });
  }
};

export const GEt_fav = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not authenticated' 
      });
    }

    const user = await User.findById(req.user._id).populate('favorites');
    res.json({
      success: true,
      favorites: user.favorites
    });
  } catch (error) {
    console.error('Get Favorites Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching favorites', 
      error: error.message 
    });
  }
};

// Admin only routes
export const Get_All_User = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Get All Users Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
};

export const delet_User = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    await user.remove();
    res.json({ 
      success: true, 
      message: 'User deleted successfully' 
    });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting user', 
      error: error.message 
    });
  }
};

   