const models = require('../models');

const sequelize = require('sequelize');
const op = sequelize.Op;

exports.create = async (req, res, next) => {
  const message = { 
    body: req.body.body,
    userId: req.body.userId,
    recipient: req.body.recipient
  };

  console.log('--> message:');
  console.log(message);

  models.message.create(message)
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}

exports.findAllByUsersIds = async (req, res, next) => {
  const whereString = {
    where: { 
      [op.or]: [{
        userId: req.params.from,
        recipient: req.params.to
      }, {
        userId: req.params.to,
        recipient: req.params.from
      }]
    }
  };

  models.message.findAll(whereString)
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
  models.message.findAll()
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}
