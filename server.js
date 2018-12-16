// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userController = require('./controllers/user');
var loginController = require('./controllers/login');
var passport = require('passport');
var authController = require('./controllers/auth');

// Connect to the users MongoDB
mongoose.connect('mongodb://localhost:27017/users');

// Create our Express application
var app = express();

// Use the passport package in our application
app.use(passport.initialize());

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /users
router.route('/users')
  .post(authController.isAuthenticated, userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for /users/:user_id
router.route('/users/:user_id')
  .get(authController.isAuthenticated, userController.getUser)
  .put(authController.isAuthenticated, userController.putUser)
  .delete(authController.isAuthenticated, userController.deleteUser);

// Create endpoint handlers for /logins
router.route('/logins')
  .post(loginController.postLogins)
  .get(authController.isAuthenticated, loginController.getLogins);

// Register all our routes with /api
app.use('/api', router);

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Start the server
app.listen(port);
console.log('Listening on port ' + port);