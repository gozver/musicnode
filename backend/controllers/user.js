const User = require('../models/user');
const Role = require('../models/role');

exports.findAll = async (req, res, next) => {
  User.findAll({
    attributes: ['id', 'name', 'surname', 'email', 'phone'],
    include: {
      model: Role,
      attributes: ['id', 'type']
    }
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}