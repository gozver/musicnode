const models = require('../models');

exports.create = async (req, res, next) => {
  // const bandIn = req.body.band;
  const roleIn = req.body.roleForm;
  const bandIn = req.body.bandForm;
  const compIn = req.body.companyForm;

  console.log('--> req.body.roleForm:');
  console.log(req.body.roleForm);
  console.log('--> req.body.bandForm:');
  console.log(req.body.bandForm);
  console.log('--> req.body.companyForm:');
  console.log(req.body.companyForm);
 
  // find the user who is going to create the role
  const user = await models.user.findOne({ where: { id: roleIn.userId } });
  const isContractor = await models.role.findOne({ where: { roleId: 3, userId: user.id } });
  const isAdmin = await models.role.findOne({ where: { roleId: 4, userId: user.id } });

  let role = null;

  if (user) {
    switch (true) {
      case parseInt(roleIn.roleId) === 1:
        // save the band into the db
        const band = await models.band.create(bandIn).catch(err => {
          if (!err.statusCode) err.statusCode = 500;
          err.message = 'The email already exists';
    
          // print error and send it to error controller
          console.log('--> error:');
          console.log(err);
          next(err);
        });
          
        // add the data to the user-band junction table
        await band.addUser(user);

        // save the new role into the db
        role = await models.role.create({ roleId: 1, role: 'band', userId: user.id, bandId: band.id });
        
        // return response to the client
        const roleWithBand = { id: role.id, roleId: role.roleId, role: role.role, userId: role.userId, bandId: role.bandId, band: band }
        res.json(roleWithBand);
      break;

      case parseInt(roleIn.roleId) === 2:
        // save the band into the db
        const company = await models.company.create(compIn).catch(err => {
          if (!err.statusCode) err.statusCode = 500;
          err.message = 'The email already exists';
    
          // print error and send it to error controller
          console.log('--> error:');
          console.log(err);
          next(err);
        });
          
        // add the data to the user-band junction table
        await company.addUser(user);

        // save the new role into the db
        role = await models.role.create({ roleId: 2, role: 'company', userId: user.id, companyId: company.id });
        
        // return response to the client
        const roleWithCompany = { id: role.id, roleId: role.roleId, role: role.role, userId: role.userId, companyId: role.companyId, company: company }
        res.json(roleWithCompany);
      break;

      case parseInt(roleIn.roleId) === 3:
        if (isContractor !== null) {
          // return error to the client
          const err = new Error();
          err.statusCode = 401;
          err.message = 'You already have a contractor role';
          next(err);
        } else {
          // save the new role into the db
          role = await models.role.create({ roleId: 3, role: 'contractor', userId: user.id });

          // return response to the client
          res.json(role);
        }
      break;

      case parseInt(roleIn.roleId) === 4:
        if (isAdmin !== null) {
          const err = new Error();
          err.statusCode = 401;
          err.message = 'You already have an admin role';
          next(err);
        } else {
          if (parseInt(roleIn.code) === 123) {
            // save the new role into the db
            role = await models.role.create({ roleId: 4, role: 'admin', userId: user.id });

            // return response to the client
            res.json(role);
          } else {
            // return error to the client
            const err = new Error();
            err.statusCode = 401;
            err.message = 'The administrator code is not correct';
            next(err);
          }
        }
      break;

      default:
        // return response to the client
        res.json('Role not found');
    }
  } else {
    // return error to the client
    const err = new Error();
    err.statusCode = 401;
    err.message = 'User not found';
    next(err);    
  }
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