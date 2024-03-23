const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Story = require('../models/story');
const CommentRoutes = require('./comment'); // Import comment routes
const SharingRoutes = require('./sharing'); // Import sharing routes


// Create story
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { content, location } = req.body;

    const story = new Story({
      user: req.user._id,
      content,
      location
    });

    await story.save();
    res.status(201).json({ message: 'Story created successfully' });
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find().populate('user', 'username'); // Populate user info
    res.status(200).json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.use('/comments', CommentRoutes);
router.use('/sharing', SharingRoutes);


module.exports = router;
