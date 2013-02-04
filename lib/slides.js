var models = require('./models');

exports.list = function (req, res) {
  models.Slides
    // find all
    .find({ organization: req.param('organization') })
    // remove __v property
    .select('-__v')
    // lean query returns plain javascript objects
    .lean()
    // execute query
    .exec(function (err, doc) {
      if (err) {
        res.send(500, err)
      } else {
        if (!doc) {
          re.send (404, { error: 404, payload: "location not found for org" })
        }
        res.send(200, doc);
      }
    });
};

exports.create = function (req, res) {
  // Extract params from request
  var slideParams = {
    location: req.param('location'),
    organization: req.param('organization'),
    title: req.param('title'),
    description: req.param('description'),
    remarks: req.param('remarks'),
    type: req.param('type'),
    url: req.param('url'),
    asset_data: req.param('asset_data'),
    status: req.param('status')
  };

  // Create new Organizations object
  var newSlide = new models.Slides(slideParams);

  // Save to database
  newSlide.save(function(err, doc) {
    if (err) {
      res.send(500, { error: 500, payload: err });
    } else {
      res.send(200, doc);
    }
  });
};

exports.get = function (req, res) {
  var query = {
    organization: req.param('organization'),
    location: req.param('location')
  };

  models.Slides
    // find all
    .find(query)
    // remove __v property
    .select('-__v')
    // lean query returns plain javascript objects
    .lean()
    // execute query
    .exec(function (err, doc) {
      if (err) {
        res.send(500, err)
      } else {
        if (!doc) {
          re.send (404, { error: 404, payload: "location not found for org" })
        }
        res.send(200, doc);
      }
    });
};

exports.update = function (req, res) {
  res.send(200);
};

exports.delete = function (req, res) {
  res.send(200);
};