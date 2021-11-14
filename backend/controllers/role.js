const Role = require('../models/role');
const User = require('../models/user');

exports.findAll = async (req, res, next) => {
  Role.findAll({
    attributes: ['id', 'role', 'avatar'],
    include: {
      model: User,
      attributes: ['id', 'name', 'surname', 'email', 'phone']
    }
  })
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}