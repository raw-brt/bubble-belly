const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  recommended: {
    type: String,
    required: true,
    default: true,
  },

  image: {
    type: String,
    required: true,
    default: ''
  },

  description: {
    type: String,
    required: true,
    default: ''
  },

  quote : {
    type: String,
    required: true,
    default: ''
  },
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;