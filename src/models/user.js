const mongoose = require('mongoose');
const Bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  phone: String
});

/**
 * User pre-save hook
 * Hashed password using bcrypt before saving
 */
userSchema.pre('save', function(next) {
  if(!this.isModified('password')) return next();

  this.password = Bcrypt.hashSync(this.password, 10);
  next();
});

/**
 * comparePassword user method
 * Allows comparison of the user object's hashed password with a non-hashed string password
 * @returns callback(result: Boolean)
 */
userSchema.methods.comparePassword = function(plaintext, callback) {
  return callback(Bcrypt.compareSync(plaintext, this.password));
};

const User = mongoose.model('User', userSchema);

module.exports = User;
