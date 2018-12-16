// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POSTS
exports.postUsers = function(req, res) {
  // Create a new instance of the User model
  var user = new User();

  // Set the user properties that came from the POST data
  user.name = req.body.name;
  user.age = req.body.age;
  user.hours = req.body.hours;
  user.userID = req.user._id;

  // Save the user and check for errors
  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User added', data: user });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  // Use the User model to find all user
  User.find({ userId: req.user._id }, function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

// Create endpoint /api/users/:user_id for GET
exports.getUser = function(req, res) {
  // Use the User model to find a specific user
  User.findById({ userId: req.user._id, _id: req.params.user_id }, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
};

// Create endpoint /api/users/:user_id for PUT
exports.putUser = function(req, res) {
  // Use the User model to find a specific user
  User.findById({ userId: req.user._id, _id: req.params.user_id }, function(err, user) {
    if (err)
      res.send(err);

    // Update the existing user hours
    user.hours = req.body.hours;

    // Save the user and check for errors
    user.save(function(err) {
      if (err)
        res.send(err);

      res.json(user);
    });
  });
};

// Create endpoint /api/users/:user_id for DELETE
exports.deleteUser = function(req, res) {
  // Use the User model to find a specific user and remove it
  User.findByIdAndRemove({ userId: req.user._id, _id: req.params.user_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User removed' });
  });
};