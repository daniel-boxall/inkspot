const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const upload = multer({ dest: 'uploads/' }); // Set destination folder for uploads
const verifyToken = require('../middleware/authMiddleware');
const Photo = require('../models/photo');
const { likePhoto, unlikePhoto } = require('../controllers/photoController');
const CommentRoutes = require('./comment'); // Import comment routes
const SharingRoutes = require('./sharing'); // Import sharing routes


// Upload photo
router.post('/upload', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { caption } = req.body;
    const imageUrl = req.file.path; // Path to uploaded image

    const photo = new Photo({
      user: req.user._id,
      imageUrl,
      caption
    });

    await photo.save();
    res.status(201).json({ message: 'Photo uploaded successfully' });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all photos
router.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find().populate('user', 'username'); // Populate user info
    res.status(200).json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Like a photo
router.post('/:photoId/like', verifyToken, async (req, res) => {
    try {
      const photo = await Photo.findById(req.params.photoId);
      if (!photo) {
        return res.status(404).json({ message: 'Photo not found' });
      }
      
      // Check if user already liked the photo
      if (photo.likes.includes(req.user._id)) {
        return res.status(400).json({ message: 'You have already liked this photo' });
      }
  
      // Add user ID to the likes array
      photo.likes.push(req.user._id);
      await photo.save();
  
      res.status(200).json({ message: 'Photo liked successfully' });
    } catch (error) {
      console.error('Error liking photo:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Unlike a photo
  router.delete('/:photoId/unlike', verifyToken, async (req, res) => {
    try {
      const photo = await Photo.findById(req.params.photoId);
      if (!photo) {
        return res.status(404).json({ message: 'Photo not found' });
      }
  
      // Remove user ID from the likes array
      photo.likes.pull(req.user._id);
      await photo.save();
  
      res.status(200).json({ message: 'Photo unliked successfully' });
    } catch (error) {
      console.error('Error unliking photo:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post('/:photoId/like', verifyToken, likePhoto);
router.delete('/:photoId/unlike', verifyToken, unlikePhoto);
router.use('/comments', CommentRoutes);
router.use('/sharing', SharingRoutes);

module.exports = router;
