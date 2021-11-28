const models = require('../models');

exports.create = async (req, res, next) => {
  const ad = { 
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description
  };

  models.ad.create(ad)
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}

exports.findAll = async (req, res, next) => {
  models.ad.findAll({
    attributes: ['id', 'title', 'description', 'createdAt', 'updatedAt'],
    include: {
      model: models.user,
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
  models.ad.findOne({
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
  models.ad.update({
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
  models.ad.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}