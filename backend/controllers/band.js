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
  const bandIn = req.body.band;
  const userId = req.body.userId;
   
  // find the user who is going to create the band
  const user = await models.user.findOne({ where: { id: userId } })
  .catch(err => {
    if (!err.statusCode) err.statusCode = 500;

    // print error and send it to error controller
    console.log('--> error:');
    console.log(err);
    next(err);
  });

  // save the band into the db
  const band = await models.band.create(bandIn)
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
    
  // add the data to the user-band junction table
  await band.addUser(user);

  // save the new role into the db
  await models.role.create({ userId, roleId: 2, role: 'band' });

  // return response to the client
  res.json(band);
}

exports.findAll = async (req, res, next) => {
  models.band.findAll({
    include: [{
      model: models.user
    }, {
      model: models.image
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

exports.findOne = async (req, res, next) => {
  await models.band.findAll({
    where: {
      id: req.params.id,
    },
    include: [{
      model: models.user
    }, {
      model: models.image
    }]
  })
    .then(band => {
      if (band.length > 0) {
        res.json(band)
      } else {
        // create error
        const err = new Error();
        err.statusCode = 401;
        err.message = 'Band not found';

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
      err.message = 'Band not found';

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
  
  models.band.update({ 
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