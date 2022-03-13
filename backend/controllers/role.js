const models = require('../models');

exports.createOldEntity = async (req, res, next) => {
  const emailIn = req.body.email;
  const roleIn = req.body.role;
  
  console.log('--> req.body.email:');
  console.log(emailIn);
  console.log('--> req.body.role:');
  console.log(roleIn);

  const user = await models.user.findOne({ where: { email: emailIn } });

  if (user) {
    switch (true) {
      case parseInt(roleIn.roleId) === 1:
        const band = await models.band.findOne({ where: { id: roleIn.bandId } });

        // add the data to the user-band junction table
        await band.addUser(user);

        // save the new role into the db
        role = await models.role.create({ roleId: 1, role: 'band', userId: user.id, bandId: band.id });
        
        // return response to the client
        const roleWithBand = { id: role.id, roleId: role.roleId, role: role.role, userId: role.userId, bandId: role.bandId, band: band }
        res.json(roleWithBand);
      break;

      case parseInt(roleIn.roleId) === 2:
        const company = await models.company.findOne({ where: { id: roleIn.companyId } });

        // add the data to the user-company junction table
        await company.addUser(user);

        // save the new role into the db
        role = await models.role.create({ roleId: 2, role: 'company', userId: user.id, companyId: company.id });
        
        // return response to the client
        const roleWithCompany = { id: role.id, roleId: role.roleId, role: role.role, userId: role.userId, companyId: role.companyId, company: company }
        res.json(roleWithCompany);
      break;
    }
  } else {
    // return error to the client
    const err = new Error();
    err.statusCode = 401;
    err.message = 'The email do not exists in the database';
    next(err);
  }

  res.json(roleIn);
}

exports.createNewEntity = async (req, res, next) => {
  const roleIn = req.body.roleForm;
  const bandIn = req.body.bandForm;
  const compIn = req.body.companyForm;

  // console.log('--> req.body.roleForm:');
  // console.log(req.body.roleForm);
  // console.log('--> req.body.bandForm:');
  // console.log(req.body.bandForm);
  // console.log('--> req.body.companyForm:');
  // console.log(req.body.companyForm);
 
  // find the user who is going to create the role
  const user = await models.user.findOne({ where: { id: roleIn.userId } });
  
  // find if the user has a contractor role
  const isContractor = await models.role.findOne({ where: { roleId: 3, userId: user.id } });

  // find if the user has an admin role
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
          
        // add the data to the user-company junction table
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

exports.findOne = async (req, res, next) => {
  await models.role.findAll({
    where: {
      id: req.params.id,
    },
    include: [{ 
      model: models.band
    }, { 
      model: models.company
    }]
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

exports.delete = async (req, res, next) => {
  const { id, uid, bid, cid } = req.params;

  console.log('--> id:');
  console.log(id);
  console.log('--> uid:');
  console.log(uid);
  console.log('--> bid:');
  console.log(bid);
  console.log('--> cid:');
  console.log(cid);

  if (bid !== 'null' && cid !== 'undefined') {
    console.log('--------');
    console.log('--> band')
    console.log('--------');

    const band = await models.band.findOne({ 
      where: { id: bid },
      include: { model: models.user }
    });
    
    // for (let i = 0; i < band.users.length; i++) {
    //   console.log(`--> users[${i}]:`);
    //   console.log(band.users[i].dataValues.id);
    //   console.log(band.users[i].dataValues.name);
    // }

    const users = band.users.filter(item => parseInt(item.dataValues.id) !== parseInt(uid));
    band.setUsers(users);
  }

  if (cid !== 'null' && cid !== 'undefined') {
    console.log('-----------');
    console.log('--> company')
    console.log('-----------');

    const company = await models.company.findOne({
      where: { id: cid },
      include: { model: models.user } 
    });
    
    // for (let i = 0; i < company.users.length; i++) {
    //   console.log(`--> users[${i}]:`);
    //   console.log(company.users[i].dataValues.id);
    //   console.log(company.users[i].dataValues.name);
    // }

    const users = company.users.filter(item => parseInt(item.dataValues.id) !== parseInt(uid));
    company.setUsers(users);
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