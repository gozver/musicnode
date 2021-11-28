const models = require('../models');

exports.findAll = async (req, res, next) => {
  models.role.findAll({
    attributes: ['id', 'type'],
    // include: [{
    //   model: models.band,
    //   attributes: ['id', 'name', 'description', 'phone', 'email', 'avatar', 'price', 'type', 'scope', 'video']
    // }, {
    //   model: models.company,
    //   attributes: ['id', 'name', 'description', 'phone', 'email', 'avatar', 'address'],
    // }]
  })
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}