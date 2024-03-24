const express = require('express');
const router = express.Router();
const upload = require('../middleware/fileUploadMiddleware');
const User = require('../models/user');

// Upload profile picture
router.post('/picture', upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in request object after authentication
    const profilePictureUrl = req.file.path; // Assuming file path is available in request object after upload
    // Update user profile with profile picture URL
    await User.findByIdAndUpdate(userId, { profilePictureUrl });
    res.status(200).json({ message: 'Profile picture uploaded successfully' });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ error: 'An error occurred while uploading profile picture' });
  }
});

// Upload cover photo
router.post('/cover-photo', upload.single('coverPhoto'), async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in request object after authentication
    const coverPhotoUrl = req.file.path; // Assuming file path is available in request object after upload
    // Update user profile with cover photo URL
    await User.findByIdAndUpdate(userId, { coverPhotoUrl });
    res.status(200).json({ message: 'Cover photo uploaded successfully' });
  } catch (error) {
    console.error('Error uploading cover photo:', error);
    res.status(500).json({ error: 'An error occurred while uploading cover photo' });
  }
});

// Update profile information
router.put('/', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in request object after authentication
    const { bio, interests } = req.body; // Assuming bio and interests are sent in request body
    // Update user profile with new information
    await User.findByIdAndUpdate(userId, { bio, interests });
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'An error occurred while updating profile' });
  }
});

module.exports = router;
