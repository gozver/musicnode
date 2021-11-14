const Company = require('../models/company');

exports.findAll = async (req, res, next) => {
  Company.findAll()
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}