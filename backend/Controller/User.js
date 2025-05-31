import User from "../models/User.js";

export const View_Profile= async (req, res) => {
     try {
       const user = await User.findById(req.user._id)
         .select('-password')
         .populate('favorites');
       res.json(user);
     } catch (error) {
       res.status(500).json({ message: 'Error fetching profile', error: error.message });
     }
   };
   export const UpdateUser=async (req, res) => {
     try {
       const updates = Object.keys(req.body);
       const allowedUpdates = ['name', 'email', 'phone'];
       const isValidOperation = updates.every(update => allowedUpdates.includes(update));
   
       if (!isValidOperation) {
         return res.status(400).json({ message: 'Invalid updates' });
       }
   
       updates.forEach(update => req.user[update] = req.body[update]);
       await req.user.save();
   
       res.json(req.user);
     } catch (error) {
       res.status(500).json({ message: 'Error updating profile', error: error.message });
     }
   };
   export const GetUser_property=  async (req, res) => {
     try {
       const properties = await Property.find({ owner: req.user._id });
       res.json(properties);
     } catch (error) {
       res.status(500).json({ message: 'Error fetching properties', error: error.message });
     }
   };
   export const GEt_fav=async (req, res) => {
     try {
       const user = await User.findById(req.user._id).populate('favorites');
       res.json(user.favorites);
     } catch (error) {
       res.status(500).json({ message: 'Error fetching favorites', error: error.message });
     }
   };
   //for only Admin
   export const Get_All_User= async (req, res) => {
     try {
       const users = await User.find().select('-password');
       res.json(users);
     } catch (error) {
       res.status(500).json({ message: 'Error fetching users', error: error.message });
     }
   }
   //DELET USER ADMIN ONLY
   export const delet_User= async (req, res) => {
     try {
       const user = await User.findById(req.params.id);
       
       if (!user) {
         return res.status(404).json({ message: 'User not found' });
       }
   
       await user.remove();
       res.json({ message: 'User deleted' });
     } catch (error) {
       res.status(500).json({ message: 'Error deleting user', error: error.message });
     }
   };

   