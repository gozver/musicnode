const models = require('../models');

exports.create = async (req, res, next) => {
  const userRole = {
    userId: req.body.userId,
    roleId: req.body.roleId,
    bandId: req.body.bandId,
    companyId: req.body.companyId
  };

  models.userRole.create(userRole)
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}

exports.findAll = async (req, res, next) => {  
  models.userRole.findAll()
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}

exports.findByRoleId = async (req, res, next) => {
  const roleId = req.params.roleId;
  const whereString = { where: { roleId } };

  models.userRole.findAll(whereString)
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}

exports.findByUserId = async (req, res, next) => {  
  models.userRole.findAll({
    where: {
      userId: req.params.userId
    }
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}