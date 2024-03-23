// auth.js
const verifyToken = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Registration route
router.post('/register', async (req, res) => {
  // Implement registration logic here
  try {
    const { username, email, password } = req.body;

    // Validate request body
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user with the same email already exists in the database (handle duplicates)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create new user in the database (using Mongoose)
    const newUser = await User.create({ username, email, password });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Login route
router.post('/login', (req, res) => {
  // Implement login logic here
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Authenticate user (check credentials against database)

    // If authentication succeeds, generate JWT token and send it in response
    // Generate JWT token with user data
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token: 'generated_jwt_token_here' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  // Implement logout logic here

});

module.exports = router;
