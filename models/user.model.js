const mongoose      = require('mongoose');
const bcrypt        = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// Random to taken to allow account validation through email
const generateRandomToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You have to input a name!'],
    minLength: [8, 'Name needs at least 8 characters'],
    trim: true
  },

  email: {
    type: String,
    required: [true, 'Please, type an email'],
    unique: true,
    trim: true,
    lowecase: true,
    match: [EMAIL_PATTERN, 'Email is invalid']
  },

  username: {
    type: String,
    required: [true, 'Please, type an username'],
    unique: true,
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password needs at least 8 characters']
  },

  validationToken: {
    type: String,
    default: generateRandomToken
  },

  validated: {
    type: Boolean,
    default: true
  }, 
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = User;