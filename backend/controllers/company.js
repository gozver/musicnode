const models = require('../models');

exports.findAll = async (req, res, next) => {
  models.company.findAll({
    attributes: ['id', 'name', 'description', 'phone', 'email', 'avatar', 'address'],
    include: {
      model: models.role,
      attributes: ['id', 'type']
    }
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}