var models = require('./models');

exports.list = function (req, res) {
  models.Locations
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
  var locationParams = {
    id: req.body['id'],
    name: req.param('name'),
    organization: req.param('organization')
  };

  // Create new Users object
  var newLocation = new models.Locations(locationParams);

  // Save to database
  newLocation.save(function(err, doc) {
    if (err) {
      res.send(500, err);
    } else {
      res.send(200, doc);
    }
  });
};

exports.get = function (req, res) {
  // build location id from req.params
  var location_id = req.param('organization') + "/" + req.param('location');

  models.Locations
    // find by location id
    .findOne({ id: location_id })
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
  // build location id from req.params
  var location_id = req.param('organization') + "/" + req.param('location');

  models.Locations
    // find by location id
    .findOne({ id: location_id })
    // execute query
    .exec(function (err, doc) {
      if (err) {
        res.send(500, err);
      } else {
        if (doc) {
          // update properties
          req.body['name'] ? doc.name = req.body['name'] : null;
          req.body['access_mode'] ? doc.access_mode = req.body['access_mode'] : null;
          req.body['status'] ? doc.status = req.body['status'] : null;

          // save
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
  // build location id from req.params
  var location_id = req.param('organization') + "/" + req.param('location');

  models.Locations
    // find by location id
    .findOneAndRemove({ id: location_id })
    // execute query
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