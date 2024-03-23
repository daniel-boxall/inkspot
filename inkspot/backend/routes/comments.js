const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Comment = require('../models/Comment');

// Add comment
router.post('/add', verifyToken, async (req, res) => {
  try {
    const { content } = req.body;

    const comment = new Comment({
      user: req.user._id,
      content
    });

    await comment.save();
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get comments
router.get('/get', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update comment
router.put('/update/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true });

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment updated successfully', updatedComment });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete comment
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(204).end(); // No content in response body
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
