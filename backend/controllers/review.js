const models = require('../models');

// exports.create = async (req, res, next) => {
//   const ad = { 
//     title: req.body.title,
//     price: req.body.price,
//     location: req.body.location,
//     description: req.body.description,
//     userId: req.body.userId
//   };

//   models.ad.create(ad)
//     .then(data => res.json(data))
//     .catch(err => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err); // go to error controller
//     });
// }

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