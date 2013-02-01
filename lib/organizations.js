var models = require('./models');

exports.list = function (req, res) {
  models.Organizations
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
  var orgParams = {
    id: req.param('id'),
    name: req.param('name')
  };

  // Create new Organizations object
  var newOrg = new models.Organizations(orgParams);

  // Save to database
  newOrg.save(function(err, user) {
    if (err) {
      res.send(500, err);
    } else {
      res.send(200, user);
    }
  });
};

exports.get = function (req, res) {
  models.Organizations
    // find by id
    .findOne({ id: req.param('id') })
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
  models.Organizations
    .findOne({ id: req.param('id') })
    .exec(function (err, doc) {
      if (err) {
        res.send(500, err);
      } else {
        if (doc) {
          doc.name = req.body['name'];
          doc.save(function (err, doc) {
            if (err) {
              res.send(500, err);
            } else {
              res.send(200, doc);
            }
          });
        } else {
          res.send(404);
        }
      }
    });
};

exports.delete = function (req, res) {
  models.Organizations
    .findOneAndRemove({ id: req.param('id') })
    .exec(function (err, doc) {
      if (err) {
        res.send(500, err);
      } else {
        if (doc) {
          res.send(200, doc);
        } else {
          res.send(404);
        }
      }
    });
};