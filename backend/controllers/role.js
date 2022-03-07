const models = require('../models');

exports.create = async (req, res, next) => {
  // const bandIn = req.body.band;
  const userId = req.body.userId;
  const roleId = parseInt(req.body.roleId);

  console.log('--> req.body:');
  console.log(req.body);
  console.log('--> userId:');
  console.log(userId);
  console.log('--> roleId:');
  console.log(roleId);
   
  // find the user who is going to create the role
  const user = await models.user.findOne({ where: { id: userId } });

  if (user) {
    console.log('--> user:');
    console.log(user.id);
    
    let role = null;

    switch (true) {
      case roleId === 3:
        console.log('--> roleId = 3')

        // save the new role into the db
        role = await models.role.create({ roleId: 3, role: 'contractor', userId: user.id });

        // return response to the client
        res.json(role);
      break;

      case roleId === 4:
        console.log('--> roleId = 3')
        // save the new role into the db
        role = await models.role.create({ roleId: 4, role: 'admin', userId: user.id });

        // return response to the client
        res.json(role);
      break;

      default:
        // return response to the client
        res.json('default');
    }
  } else {
    const err = new Error();
    err.statusCode = 401;
    err.message = 'User not found';
    next(err);    
  }

  // // save the band into the db
  // const band = await models.band.create(bandIn)
  //   .catch(err => {
  //     if (!err.statusCode) err.statusCode = 500;

  //     // print error and send it to error controller
  //     console.log('--> error:');
  //     console.log(err);
  //     next(err);
  //   });
    
  // // add the data to the user-band junction table
  // await band.addUser(user);

  // // save the new role into the db
  // await models.role.create({ roleId: 1, role: 'band', userId, bandId: band.id });

  // // return response to the client
  // res.json(band);
}

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

exports.delete = async (req, res, next) => {
  console.log('--> req.params.id');
  console.log(req.params.id);

  const roleObj = await models.role.findAll({ where: { id: req.params.id } });

  const { id, roleId, role, userId, bandId, companyId } = roleObj[0].dataValues;

  console.log(`--> id: ${id}`);
  console.log(`--> roleId: ${roleId}`);
  console.log(`--> role: ${role}`);
  console.log(`--> userId: ${userId}`);
  console.log(`--> bandId: ${bandId}`);
  console.log(`--> companyId: ${companyId}`);
  
  if (bandId) {
    // TODO
    const bandObj = await models.band.findAll({ where: { id: bandId } });

    console.log('--> bandObj:');
    console.log(bandObj);
  } 

  if (companyId) {
  // TODO
  }

  models.role.destroy({
    where: {
      id: req.params.id
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