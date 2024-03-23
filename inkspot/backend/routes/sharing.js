const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Photo = require('../models/photo');
const Story = require('../models/story');

// Share photo
router.post('/photos/:photoId/share', verifyToken, async (req, res) => {
  try {
    const { photoId } = req.params;

    // Find the photo by ID
    const photo = await Photo.findById(photoId);

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // Update the share count
    photo.shares++;
    await photo.save();

    res.status(200).json({ message: 'Photo shared successfully', photo });
  } catch (error) {
    console.error('Error sharing photo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Share story
router.post('/stories/:storyId/share', verifyToken, async (req, res) => {
  try {
    const { storyId } = req.params;

    // Find the story by ID
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    // Update the share count
    story.shares++;
    await story.save();

    res.status(200).json({ message: 'Story shared successfully', story });
  } catch (error) {
    console.error('Error sharing story:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
