// routes/userRoute.js
import express from 'express';
import User from '../models/User.js'; // Make sure you have a User model

const router = express.Router();

// Admin: Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});

// Update a user (Admin)
router.put('/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // return the updated document
        runValidators: true, // validate before update
      });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Server error while updating user' });
    }
  });
  
  // Delete a user (Admin)
  router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ message: 'Server error while deleting user' });
    }
  });

export default router;
