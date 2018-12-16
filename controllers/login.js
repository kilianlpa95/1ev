// Load required packages
var Login = require('../models/login');

// Create endpoint /api/login for POST
exports.postLogins = function(req, res) {
  var login = new Login({
    loginname: req.body.loginname,
    password: req.body.password
  });

  login.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'New worker added' });
  });
};

// Create endpoint /api/logins for GET
exports.getLogins = function(req, res) {
  Login.find(function(err, logins) {
    if (err)
      res.send(err);

    res.json(logins);
  });
};