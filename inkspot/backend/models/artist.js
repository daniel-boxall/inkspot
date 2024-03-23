const mongoose = require('mongoose');

const tattooArtistSchema = new mongoose.Schema({
  // Existing fields
  // ...
  location: { type: String },
  styles: [{ type: String }],
  rating: { type: Number },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  // Add more fields as needed for availability, etc.
});

module.exports = mongoose.model('TattooArtist', tattooArtistSchema);
