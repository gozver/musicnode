const Role = require('../models/role');
const Band = require('../models/band');
const Company = require('../models/company');

exports.findAll = async (req, res, next) => {
  Role.findAll({
    attributes: ['id', 'type'],
    // include: [{
    //   model: Band,
    //   attributes: ['id', 'name', 'description', 'phone', 'email', 'avatar', 'address']
    // }, {
    //   model: Company,
    //   attributes: ['id', 'name']
    // }],
  })
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}