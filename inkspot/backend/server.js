// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/authMiddleware');
const protectedRoute = require('./routes/protectedRoute');
const limiter = require('./middleware/rateLimitMiddleware'); // Import rate limit middleware
require('dotenv').config(); // Load environment variables from .env file

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Set up middleware
app.use(express.json());
app.use(limiter);

// Database connection
const dbConnectionString = process.env.DB_CONNECTION_STRING; // Get DB connection string from .env file
mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api', verifyToken, protectedRoute);
app.use('/api', userProfileRoutes);
app.use('/api/photos', verifyToken, photoRoutes); // Mount photo routes
app.use('/api/stories', verifyToken, storyRoutes); // Mount story routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
