// controllers/photoController.js

const Photo = require('../models/photo');

exports.likePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    
    if (photo.likes.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already liked this photo' });
    }

    photo.likes.push(req.user._id);
    await photo.save();

    res.status(200).json({ message: 'Photo liked successfully' });
  } catch (error) {
    console.error('Error liking photo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.unlikePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    photo.likes.pull(req.user._id);
    await photo.save();

    res.status(200).json({ message: 'Photo unliked successfully' });
  } catch (error) {
    console.error('Error unliking photo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
