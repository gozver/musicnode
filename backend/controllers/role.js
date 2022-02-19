const models = require('../models');

exports.findAll = async (req, res, next) => {
  models.role.findAll()
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}

exports.findAllByUserId = async (req, res, next) => {
  await models.role.findAll({
    where: { 
      userId: req.params.id
    },
    include: [{ 
      model: models.band
    }, { 
      model: models.company
    }]
  })
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}