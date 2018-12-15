// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');

// Connect to the users MongoDB
mongoose.connect('mongodb://localhost:27017/users');

// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'Mensaje de prueba' });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Listening on port ' + port);