const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  location: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Array of comment IDs
  shares: { type: Number, default: 0 } // Track the number of shares
  
  
  // Add more fields as needed
});

module.exports = mongoose.model('Story', storySchema);
