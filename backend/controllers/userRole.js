const models = require('../models');

exports.findAll = async (req, res, next) => {  
  models.userRole.findAll()
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}

exports.findByUserId = async (req, res, next) => {  
  models.userRole.findAll({
    where: {
      userId: req.params.userId
    }
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}