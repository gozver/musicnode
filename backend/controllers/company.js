const sequelize = require('sequelize');
const op = sequelize.Op;

const models = require('../models');
const config = require('../config/config.json');

/**
 * many to many relationships:
 * https://sequelize.org/master/manual/assocs.html#many-to-many-relationships
 * 
 * special methods/mixins added to instances:
 * https://sequelize.org/master/manual/assocs.html#special-methods-mixins-added-to-instances
 */

 exports.create = async (req, res, next) => {
  const companyIn = req.body.company;
  const userId = req.body.userId;
   
  // find the user who is going to create the company
  const user = await models.user.findOne({ where: { id: userId } })
  .catch(err => {
    if (!err.statusCode) err.statusCode = 500;

    // print error and send it to error controller
    console.log('--> error:');
    console.log(err);
    next(err);
  });

  // save the company into the db
  const company = await models.company.create(companyIn)
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
    
  // add the data to the user-band junction table
  await company.addUser(user);

  // save the new role into the db
  await models.role.create({ roleId: 2, role: 'company', userId, compId: company.id });

  // return response to the client
  res.json(company);
}

exports.findAll = async (req, res, next) => {
  models.company.findAll({
    include: {
      model: models.user
    }
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

exports.findAllByParams = async (req, res, next) => {
  const { name, email } = req.query
  let whereString = [];

  if (name !== '') {
    whereString.push({ name: { [op.like]: '%' + name + '%' } });
  }
  
  if (email !== '') {
    whereString.push({ email: { [op.like]: '%' + email + '%' } });
  }

  await models.company.findAll({
    where: whereString,
    include: { model: models.user }
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
  await models.company.findAll({
    where: {
      id: req.params.id,
    },
    include: [{
      model: models.user
    }, {
      model: models.image
    }]
  })
    .then(company => {
      if (company.length > 0) {
        res.json(company)
      } else {
        // create error
        const err = new Error();
        err.statusCode = 401;
        err.message = 'Company not found';

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
      err.message = 'Company not found';

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
  
  models.company.update({ 
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

exports.updateImages = async (req, res, next) => {
  // console.log('--> req.body.id:');
  // console.log(req.body.id);
  // console.log('--> req.files:');
  // console.log(req.files);

  const id = req.body.id;
  const filesList = req.files;

  filesList.forEach(file => {
    const companyImage = config.server.url + '/images/' + file.filename;

    const image = {
      adId: null,
      musicianId: null,
      bandId: null,
      companyId: id,
      image: companyImage,
    };  

    models.image.create(image)
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
  });

  res.json(filesList);
}

exports.deleteImages = async (req, res, next) => {
  models.image.destroy({
    where: {
      companyId: req.params.id
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