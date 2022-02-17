const models = require('../models');
const config = require('../config/config.json');

const sequelize = require('sequelize');
const op = sequelize.Op;

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

exports.findAllByParams = async (req, res, next) => {
  const { name, email, roleId } = req.query
  let whereString = [];

  if (name !== '') {
    whereString.push({ name: { [op.like]: '%' + name + '%' } });
  }
  
  if (email !== '') {
    whereString.push({ email: { [op.like]: '%' + email + '%' } });
  }

  if (parseInt(roleId) === 3 || parseInt(roleId) === 4) {  
    whereString.push({ active_role: { [op.like]: '%' + roleId + '%' } });
  }

  await models.user.findAll({
    where: whereString
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

exports.findOne = async (req, res, next) => {
  await models.user.findAll({
    where: {
      id: req.params.id,
    },
    include: { 
      model: models.role 
    },
  })
    .then(user => {
      if (user.length > 0) {
        res.json(user)
      } else {
        // create error
        const err = new Error();
        err.statusCode = 401;
        err.message = 'User not found';

        // print error and send it to error controller
        console.log('--> error:');
        console.log(err);
        next(err);  
      }
    })
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
  // console.log('--> req.body.id:');
  // console.log(req.body.id);

  // console.log('--> req.file:');
  // console.log(req.file);

  const id = req.body.id;
  const avatar = config.server.url + '/avatars/' + req.file.filename;
  
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