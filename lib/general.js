var _package = require('../package.json');

exports.ping = function (req, res) {
  var o = {
    "name": _package.name,
    "version": _package.version
  };

  res.send(o);
};

exports.notfound = function (req, res) {
  res.send(404, { error: "are you lost?" });
};

exports.catchError = function (err, req, res, next) {
  res.send(err.status || 500, { error: err.message });
};