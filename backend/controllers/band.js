const Band = require('../models/band');

exports.findAll = async (req, res, next) => {
  Band.findAll()
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}