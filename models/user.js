// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  hours: Number, 
  userID: String
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);