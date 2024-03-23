const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  caption: { type: String },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked the photo
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Array of comment IDs,
  shares: { type: Number, default: 0 }, // Track the number of shares
});

module.exports = mongoose.model('Photo', photoSchema);