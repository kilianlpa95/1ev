// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Login = require('../models/login');

passport.use(new BasicStrategy(
  function(loginname, password, callback) {
    Login.findOne({ loginname: loginname }, function (err, login) {
      if (err) { return callback(err); }

      // No worker found with that loginname
      if (!login) { return callback(null, false); }

      // Make sure the password is correct
      login.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, login);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });