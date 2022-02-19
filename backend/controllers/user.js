const bcrypt = require('bcryptjs');
const sequelize = require('sequelize');
const op = sequelize.Op;

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

exports.findAllByParams = async (req, res, next) => {
  const { name, surname, roleId } = req.query
  let whereString = [];

  console.log('--> req.query');
  console.log(req.query);

  if (name !== '') {
    whereString.push({ name: { [op.like]: '%' + name + '%' } });
  }
  
  if (surname !== '') {
    whereString.push({ surname: { [op.like]: '%' + surname + '%' } });
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

exports.updateInfo = async (req, res, next) => {
  const { id, name, surname, phone, password } = req.body;
    
  const hashedPwd = await bcrypt.hash(password, 12);

  await models.user.update({ 
    id, name, surname, phone, password: hashedPwd
  }, {
    where: { id }
  })
    .then(user => res.json(user))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}

exports.updateActiveRole = async (req, res, next) => {
  const { id, activeRole } = req.body;

  console.log('----------------------------------------------');
  console.log(req.body);
  console.log('----------------------------------------------');
    
  await models.user.update({ 
    activeRole
  }, {
    where: { id }
  })
    .then(user => res.json(user))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}