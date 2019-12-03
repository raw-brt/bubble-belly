const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true,
    default: ''
  },

  recommended: {
    type: String,
    required: true,
    default: true,
  },

  ingredients: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;