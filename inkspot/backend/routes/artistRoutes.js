const express = require('express');
const router = express.Router();
const Artist = require('../models/artist');
const upload = require('../middleware/fileUploadMiddleware');

// Create artist profile
router.post('/profile', async (req, res) => {
  try {
    const { username, email, password, bio, location } = req.body;
    const artist = new Artist({ username, email, password, bio, location });
    await artist.save();
    res.status(201).json({ message: 'Artist profile created successfully' });
  } catch (error) {
    console.error('Error creating artist profile:', error);
    res.status(500).json({ error: 'An error occurred while creating artist profile' });
  }
});

// Upload portfolio images
router.post('/portfolio', upload.array('portfolioImages', 5), async (req, res) => {
  try {
    const artistId = req.user.id; // Assuming artist ID is available in request object after authentication
    const portfolioImages = req.files.map(file => file.path);
    await Artist.findByIdAndUpdate(artistId, { $push: { portfolio: { $each: portfolioImages } } });
    res.status(200).json({ message: 'Portfolio images uploaded successfully' });
  } catch (error) {
    console.error('Error uploading portfolio images:', error);
    res.status(500).json({ error: 'An error occurred while uploading portfolio images' });
  }
});

// Update artist information
router.put('/profile', async (req, res) => {
  try {
    const artistId = req.user.id; // Assuming artist ID is available in request object after authentication
    const { bio, location } = req.body;
    await Artist.findByIdAndUpdate(artistId, { bio, location });
    res.status(200).json({ message: 'Artist information updated successfully' });
  } catch (error) {
    console.error('Error updating artist information:', error);
    res.status(500).json({ error: 'An error occurred while updating artist information' });
  }
});

router.get('/profile', async (req, res) => {
  try {
    // Assuming you have a method to fetch artist profile data from the database
    const artistProfile = await Artist.findOne({ /* Specify your query criteria */ });
    if (!artistProfile) {
      return res.status(404).json({ error: 'Artist profile not found' });
    }
    res.status(200).json(artistProfile);
  } catch (error) {
    console.error('Error fetching artist profile:', error);
    res.status(500).json({ error: 'An error occurred while fetching artist profile' });
  }
});

module.exports = router;
