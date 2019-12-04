const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  recommended: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  quote : {
    type: String,
    default: ''
  },
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;