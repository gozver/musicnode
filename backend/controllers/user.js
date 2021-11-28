const models = require('../models');

exports.findAll = async (req, res, next) => {
  models.user.findAll({
    attributes: ['id', 'name', 'surname', 'email', 'phone'],
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