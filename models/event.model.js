const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  feeling: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  body: {
    type: String,
    maxlength: [280, 'You can write up to 280 characters']
  },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

