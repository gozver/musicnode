const Ad = require('../models/ad');
const User = require('../models/user');

exports.create = async (req, res, next) => {
  const ad = { 
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description
  };

  Ad.create(ad)
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}

exports.findAll = async (req, res, next) => {
  Ad.findAll({
    attributes: ['id', 'title', 'description', 'createdAt', 'updatedAt'],
    include: {
      model: User,
      attributes: ['id', 'name', 'surname', 'phone', 'email']
    },
    order: [['created_at','DESC']]
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}

exports.findOne = async (req, res, next) => {  
  Ad.findOne({
    where: {
      id: req.params.id
    }
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}

exports.update = async (req, res, next) => {
  Ad.update({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
  }, {
    where: {
      id: req.params.id
    }
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}

exports.delete = async (req, res, next) => {
  Ad.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}