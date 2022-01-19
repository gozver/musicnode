const models = require('../models');
const config = require('../config/config.json');

exports.findAll = async (req, res, next) => {
  models.user.findAll({
    include: {
      model: models.role
    }
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}

exports.findOne = async (req, res, next) => {
  await models.user.findAll({
    where: {
      id: req.params.id,
    },
    include: { 
      model: models.role 
    },
  })
    .then(data => res.json(data))
    .catch(() => {
      // create error
      const err = new Error();
      err.statusCode = 401;
      err.message = 'User not found';

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}

exports.updateAvatar = async (req, res, next) => {
  console.log('--> req.body.id:');
  console.log(req.body.id);

  console.log('--> req.file:');
  console.log(req.file);

  const id = req.body.id;
  const avatar = config.serverUrl + '/avatars/' + req.file.filename;
  
  models.user.update({ 
    avatar 
  }, {
    where: { id }
  }).then(() => res.status(201).json(avatar))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}