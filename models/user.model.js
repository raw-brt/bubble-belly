const mongoose      = require('mongoose');
const bcrypt        = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

// Random value to take and allow account validation through email
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
    lowercase: true,
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
  birthDate: {
    type: String,
  },
  lastPeriod: {
    type: String,
  },
  validationToken: {
    type: String,
    default: generateRandomToken
  },
  validated: {
    type: Boolean,
    default: true
  },
  favoriteRecipes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }],
    default: []
  },
  babies: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Baby'
    }],
    default: []
  },
  momWeight: {
    type: Number
  },
  bellyDiameter: {
    type: Number
  },
  events: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }],
    default: []
  },
}, { timestamps: true })

// Password hashing as a pre-hook for the save method
userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next();
          });
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

// Comparison method between the password and the password's hash
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;