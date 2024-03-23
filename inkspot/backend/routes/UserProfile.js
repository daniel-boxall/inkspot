// routes/userProfile.js

const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');

// Route to create a new user profile
router.post('/', async (req, res) => {
  try {
    // Create user profile based on request body
    const userProfile = await UserProfile.create(req.body);
    res.status(201).json(userProfile);
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update an existing user profile
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProfile = await UserProfile.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get user profile by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userProfile = await UserProfile.findById(id);
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to delete user profile by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await UserProfile.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
