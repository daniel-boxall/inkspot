const mongoose = require('mongoose');

const tattooArtistSchema = new mongoose.Schema({
  // Existing fields
  // ...
  username: String,
  email: String,
  password: String,
  profilePictureUrl: String,
  coverPhotoUrl: String,
  bio: String,
  interests: [String],
  location: { type: String },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  profileVisibility: { type: String, default: 'public' }, // 'public', 'friends', 'private'
  messagePrivacy: { type: String, default: 'everyone' }, // 'everyone', 'friends', 'none'
  postVisibility: { type: String, default: 'public' }, // 'public', 'friends', 'private'
  styles: [{ type: String }],
  rating: { type: Number },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  // Add more fields as needed for availability, etc.
});

module.exports = mongoose.model('TattooArtist', tattooArtistSchema);
