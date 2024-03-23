const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Message = require('../models/message');

// Send a message
router.post('/send', verifyToken, async (req, res) => {
  try {
    const { recipientId, content } = req.body;

    const message = new Message({
      sender: req.user._id,
      recipient: recipientId,
      content,
    });

    await message.save();

    res.status(201).json({ message: 'Message sent successfully', message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get messages between the current user and a recipient
router.get('/with/:recipientId', verifyToken, async (req, res) => {
  try {
    const { recipientId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, recipient: recipientId },
        { sender: recipientId, recipient: req.user._id },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
