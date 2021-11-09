const Ad = require('../models/ad');

exports.create = async (req, res, next) => {
  // // check for errors
  // const errors = validationResult(req);
  
  // // if errors, return errors in a json response
  // if (!errors.isEmpty()) {
  //   console.log('> validation errors:', errors.errors);

  //   return res.status(400).json({ errors: errors.array() });
  // }

  // if no errors, continue  
  const ad = { 
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description
  };

  // save the user
  Ad.create(ad)
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}

exports.findAll = async (req, res, next) => {
  Ad.findAll({
    order: [['created_at','DESC']]
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}

exports.findByPk = async (req, res, next) => {  
  Ad.findByPk(req.params.id)
    .then(data => res.json(data))
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