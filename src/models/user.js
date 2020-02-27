const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const emailVal = require('email-validator');

/**
  * Email validator
  * Evaluates if a string is a valid email address
  * @returns Boolean
  */
const emailValidator = value => {
  return emailVal.validate(value);
};

/**
  * Password validator
  * 6 characters minimum, at least one letter and one number
  * @returns Boolean
  */
const passValidator = value => {
  const passRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passRegEx.test(value);
};

/**
  * Phone validator
  * 10 consecutive digits
  * @returns Boolean
  */
const phoneValidator = value => {
  const phoneRegEx = /\d{10}/;
  return phoneRegEx.test(value);
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [emailValidator, 'Email address contains invalid characters'],
    required: [true, 'Email address is required']
  },
  password: {
    type: String,
    validate: [passValidator, 'Password should be at least 6 digits long and contain both letters and digits'],
    required: [true, 'Password is required']
  },
  phone: {
    type: String,
    validate: [phoneValidator, 'Phone number should be a 10-digit number'],
    required: [true, 'Phone is required']
  }
});

/**
 * User pre-save hook
 * Hashed password using bcrypt before saving
 */
userSchema.pre('save', function(next) {
  if(!this.isModified('password')) return next();

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

/**
 * comparePassword user method
 * Allows comparison of the user object's hashed password with a non-hashed string password
 * @returns callback(result: Boolean)
 */
userSchema.methods.comparePassword = function(plaintext) {
  return bcrypt.compareSync(plaintext, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
