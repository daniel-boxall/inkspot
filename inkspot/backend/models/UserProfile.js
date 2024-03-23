// models/UserProfile.js

const mongoose = require('mongoose');

// Define schema for user profile
const userProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  bio: { type: String },
  location: { type: String },
  favoriteTattooStyles: [{ type: String }],
  passionAboutTattoos: { type: String }
});

// Create and export the UserProfile model
module.exports = mongoose.model('UserProfile', userProfileSchema);
