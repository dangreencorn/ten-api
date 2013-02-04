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
        res.send(500, { error: 500, payload: err });
      } else {
        if (!doc) {
          re.send (404, { error: 404, payload: "organization not found" })
        }
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
  newOrg.save(function(err, doc) {
    if (err) {
      res.send(500, { error: 500, payload: err });
    } else {
      res.send(200, doc);
    }
  });
};

exports.get = function (req, res) {
  models.Organizations
    // find by organization id
    .findOne({ id: req.param('organization') })
    // remove __v property
    .select('-__v')
    // execute query
    .lean()
    .exec(function (err, doc) {
      if (err) {
        res.send(500, err)
      } else {
        if (doc == null) {
          res.send(404, { error: 404, payload: "Not Found" });
        } else {
          res.send(200, doc);
        }
      }
    });
};

exports.update = function (req, res) {
  models.Organizations
    // find by organization id
    .findOne({ id: req.param('organization') })
    // execute query
    .exec(function (err, doc) {
      if (err) {
        res.send(500, err);
      } else {
        if (doc) {
          // update properties
          doc.name = req.body['name'];

          // save
          doc.save(function (err, doc) {
            if (err) {
              res.send(500, { error: 500, payload: err });
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
    // find by organization id
    .findOneAndRemove({ id: req.param('organization') })
    // execute query
    .exec(function (err, doc) {
      if (err) {
        res.send(500, { error: 500, payload: err });
      } else {
        if (doc) {
          res.send(200, doc);
        } else {
          res.send(404);
        }
      }
    });
};