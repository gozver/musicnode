const models = require('../models');

exports.create = async (req, res, next) => {
  const review = { 
    body: req.body.body,
    rating: req.body.rating,
    userId: req.body.userId,
    bandId: req.body.bandId,
  };

  models.review.create(review)
    .then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}

exports.findAll = async (req, res, next) => {
  console.log('--> req.params:');
  console.log(req.params);

  models.review.findAll({
    where: {
      bandId: req.params.bandId
    },
    include: {
      model: models.user,
      attributes: ['id', 'name', 'surname', 'phone', 'email', 'avatar']
    },
    order: [['created_at','DESC']]
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err); // go to error controller
    });
}

exports.delete = async (req, res, next) => {
  models.review.destroy({
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