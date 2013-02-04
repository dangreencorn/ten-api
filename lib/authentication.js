var models = require('./models');
var express = require('express');

exports.authenticate = function(req, res, next) {
  console.log(req.auth);

  // check basic auth
  if (!req.auth || !req.auth.username || !req.auth.password) {
    return res.send(401, { error: 401, payload: "Unauthorized" });
  }

  // db query
  models.Users
    // retrieve by username
    .findOne({ username: req.auth.username })
    // select password so we can compare
    .select('+password -__v')
    // execute query
    .lean()
    .exec(function (err, doc) {
      if (err) {
        return next(err);
      }

      if (!doc) {
        return res.send(401, { error: 401, payload: "User Not Found" })
      }

      // verify password
      if (doc.password == req.auth.password) {
        // verify permissions
        // may need to do this after retreiving object from database.
        // someACLChecking()

        // strip password
        delete doc['password'];

        // pass authenticated user object to next middleware
        req.user = doc;

        next();
      } else {
        return res.send(401, { error: 401, payload: "Wrong Password" })
      }
    });
};