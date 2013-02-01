var _package = require('../package.json');

exports.ping = function (req, res) {
  var o = {
    "name": _package.name,
    "version": _package.version
  };

  res.send(o);
};