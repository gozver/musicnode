const models = require('../models');

exports.create = async (req, res, next) => {
  const band = { 
    name: req.body.name,
    desc: req.body.desc,
    phone: req.body.phone,
    price: req.body.price,
    type: req.body.type,
    scope: req.body.scope,
    email: req.body.email,
    video: req.body.video,
    avatar: req.body.avatar
  };

  models.band.create(band)
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
  models.band.findAll({
    // attributes: ['id', 'name', 'desc', 'phone', 'email', 'avatar', 'price', 'type', 'scope', 'video'],
    // include: {
    //   model: models.role,
    //   attributes: ['id', 'name']
    // }
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}