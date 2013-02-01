var models = require('./models');

exports.list = function (req, res) {
  models.Users
    // find all
    .find({})
    // remove __v property
    .select('-__v')
    // lean query returns plain javascript objects
    .lean()
    // execute query
    .exec(function (err, doc) {
      if (err) {
        res.send(500, err)
      } else {
        res.send(200, doc);
      }
    });
};

exports.create = function (req, res) {
  // Extract params from request
  var userParams = {
    username: req.param('username'),
    email: req.param('email'),
    password: req.param('password')
  };

  // Create new Users object
  var newUser = new models.Users(userParams);

  // Save to database
  newUser.save(function(err, user) {
    if (err) {
      res.send(500, err);
    } else {
      res.send(200, user);
    }
  });
};

exports.get = function (req, res) {
  models.Users
    // find all
    .findOne({ username: req.param('id') })
    // remove __v property
    .select('-__v')
    // execute query
    .lean()
    .exec(function (err, doc) {
      if (err) {
        res.send(500, err)
      } else {
        if (doc == null) {
          res.send(404);
        } else {
          res.send(200, doc);
        }
      }
    });
};

exports.update = function (req, res) {
  models.Users
    // find by id
    .findOne({ username: req.param('id') })
    // execute query
    .lean()
    .exec(function (err, doc) {
      if (err) {
        res.send(500, err)
      } else {
        res.send(200, doc);
      }
    });
};