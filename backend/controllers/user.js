const models = require('../models');

exports.findAll = async (req, res, next) => {
  models.user.findAll()
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
  const id = req.params.id;
  const whereString = {
    where: { id }
  };

  await models.user.findOne(whereString)
    .then(async (user) => {
      res.status(200).json({ 
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        hasRole: user.hasRole
      });
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