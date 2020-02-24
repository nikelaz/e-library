const mongoose = require('mongoose');

const userSchema = {
  email: String,
  password: String,
  phone: String
}

const User = mongoose.model('User', userSchema);

module.exports = User;
