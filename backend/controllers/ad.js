const models = require('../models');
const config = require('../config/config.json');

exports.create = async (req, res, next) => {
  const ad = { 
    title: req.body.title,
    price: req.body.price,
    location: req.body.location,
    desc: req.body.desc,
    userId: req.body.userId
  };

  models.ad.create(ad)
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
  models.ad.findAll({
    include: [{
      model: models.user
    }, {
      model: models.image
    }],
    order: [['created_at','DESC']]
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}

exports.findOne = async (req, res, next) => {  
  models.ad.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: models.user
    }, {
      model: models.image
    }],
  }).then(data => res.json(data))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}

exports.updateInfo = async (req, res, next) => {
  console.log('--> req.body:');
  console.log(req.body);

  const { id, title, desc, price, location } = req.body;
    
  await models.ad.update({ 
    title, desc, price, location
  }, {
    where: { id }
  })
    .then(ad => res.json(ad))
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
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

exports.updateImages = async (req, res, next) => {
  const id = req.body.id;
  const filesList = req.files;

  filesList.forEach(file => {
    const adImage = config.server.url + '/images/' + file.filename;

    const image = {
      adId: id,
      musicianId: null,
      bandId: null,
      companyId: null,
      image: adImage,
    };  

    models.image.create(image)
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
  });

  res.json(filesList);
}

exports.deleteImages = async (req, res, next) => {
  models.image.destroy({
    where: {
      adId: req.params.id
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