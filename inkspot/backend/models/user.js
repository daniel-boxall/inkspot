const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  favoriteStyles: [{ type: String }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  profileVisibility: { type: String, default: 'public' }, // 'public', 'friends', 'private'
  messagePrivacy: { type: String, default: 'everyone' }, // 'everyone', 'friends', 'none'
  postVisibility: { type: String, default: 'public' }, // 'public', 'friends', 'private'
});

module.exports = mongoose.model('User', userSchema);
