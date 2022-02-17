const models = require('../models');
const config = require('../config/config.json');

const sequelize = require('sequelize');
const op = sequelize.Op;

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
  await models.role.create({ userId, roleId: 3, role: 'company' });

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