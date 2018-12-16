// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our login schema
var LoginSchema = new mongoose.Schema({
  loginname: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Execute before each login.save() call
LoginSchema.pre('save', function(callback) {
  var login = this;

  // Break out if the password hasn't changed
  if (!login.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(login.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      login.password = hash;
      callback();
    });
  });
});

LoginSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Export the Mongoose model
module.exports = mongoose.model('Login', LoginSchema);