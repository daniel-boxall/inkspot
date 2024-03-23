// routes/protectedRoute.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// Example of a protected route
router.get('/protected-route', verifyToken, (req, res) => {
  res.status(200).json({ message: 'You are authorized to access this route', user: req.user });
});

module.exports = router;
