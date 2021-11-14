const Role = require('../models/role');
const User = require('../models/user');

exports.findAll = async (req, res, next) => {
  User.findAll({
    attributes: ['id', 'name', 'surname', 'email', 'phone'],
    include: {
      model: Role,
      attributes: ['id', 'role', 'avatar']
    }
  })
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}