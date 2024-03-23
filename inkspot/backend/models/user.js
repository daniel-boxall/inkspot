const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Existing fields
  // ...
  location: { type: String },
  favoriteStyles: [{ type: String }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

module.exports = mongoose.model('User', userSchema);
