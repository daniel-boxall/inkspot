const express = require('express');
const router = express.Router();
const TattooArtist = require('../models/artist');

// Search for tattoo artists
router.get('/artists', async (req, res) => {
  try {
    const { location, style } = req.query;

    // Build query based on provided search criteria
    const query = {};
    if (location) query.location = location;
    if (style) query.styles = { $in: [style] };

    const artists = await TattooArtist.find(query);

    res.status(200).json(artists);
  } catch (error) {
    console.error('Error searching for tattoo artists:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
