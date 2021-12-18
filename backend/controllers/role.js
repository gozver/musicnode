const models = require('../models');

exports.create = async (req, res, next) => {
  // const band = {
  //   userId: req.body.userId,
  //   role: req.body.name
  // };

  // models.band.create(band)
  //   .then(data => res.json(data))
  //   .catch(err => {
  //     if (!err.statusCode) err.statusCode = 500;

  //     // print error and send it to error controller
  //     console.log('--> error:');
  //     console.log(err);
  //     next(err);
  //   });
}

exports.findAll = async (req, res, next) => {
  models.role.findAll({
    // attributes: ['id', 'name'],
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