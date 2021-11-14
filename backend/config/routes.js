const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

// auth
router
  .post('/auth/login',  controllers.auth.login)
  .post('/auth/signup', controllers.auth.signup)

// user
  .get('/user',  controllers.user.findAll)

// ad
  .post  ('/ad',     middlewares.auth, controllers.ad.create)
  .get   ('/ad' ,    middlewares.auth, controllers.ad.findAll)
  .get   ('/ad/:id', middlewares.auth, controllers.ad.findByPk)
  .patch ('/ad/:id', middlewares.auth, controllers.ad.update)
  .delete('/ad/:id', middlewares.auth, controllers.ad.delete)

// role
  .get('/role', controllers.role.findAll)

// band
  .get('/band', controllers.band.findAll)

// company
  .get('/company', controllers.company.findAll);


module.exports = router;
