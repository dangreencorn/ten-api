var models = require('./models');
var express = require('express');

exports.authenticate = function(req, res, next) {
  models.Users
    .findOne({ username: req.auth.username })
    .select('+password')
    .exec(function (err, doc) {
      if (err) {
        return next(err);
      }

      // verify password
      if (doc.password == req.auth.password) {
        // verify permissions
        // may need to do this after retreiving object from database.
        // someACLChecking()

        next();
      } else {
        res.send(401, "Unauthorized")
      }
    });
};

exports.authenticate2 = express.basicAuth(function(username, password) {
  console.log(username);
  console.log(password);

  models.Users
    .findOne({ username: username })
    .select('+password')
    .exec(function (err, doc) {
      if (!doc) {
        return false;
      }
      console.log(doc);

      return true;

      return doc.username == username && doc.password == password;
    });

});