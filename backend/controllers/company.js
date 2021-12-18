const models = require('../models');

exports.create = async (req, res, next) => {
  const company = { 
    name: req.body.name,
    desc: req.body.desc,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    avatar: req.body.avatar
  };

  console.log('..................................................................')
  console.log(req.body)
  console.log('..................................................................')

  models.company.create(company)
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}

exports.findAll = async (req, res, next) => {
  models.company.findAll({
    // attributes: ['id', 'name', 'description', 'phone', 'email', 'avatar', 'address'],
    // include: {
    //   model: models.role,
    //   attributes: ['id', 'type']
    // }
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}