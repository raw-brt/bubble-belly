const mongoose = require('mongoose');

const babySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weeks: {
    type: Number,
    required: true,
  },
  babyWeight: {
    type: Number
  },
  comparation: {
    type: String
  },
}, { timestamps: true });

const Baby = mongoose.model('Baby', babySchema);

module.exports = Baby;