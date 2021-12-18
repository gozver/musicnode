const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

// NOTE: no middleware in find all to allow
// get the endpoints data from the browser => 'http://127.0.0.1:3000/model'

router
  // auth
  .post   ('/auth/login',  controllers.auth.login)
  .post   ('/auth/signup', controllers.auth.signup)

  // role
  .get    ('/role', controllers.role.findAll)

  // band
  .get    ('/band', controllers.band.findAll)
  .post   ('/band', controllers.band.create)

  // company
  .get    ('/company', controllers.company.findAll)
  .post   ('/company', controllers.company.create)

  // ad
  .get    ('/ad',                       controllers.ad.findAll)
  .post   ('/ad',     middlewares.auth, controllers.ad.create)
  .get    ('/ad/:id', middlewares.auth, controllers.ad.findOne)
  .patch  ('/ad/:id', middlewares.auth, controllers.ad.update)
  .delete ('/ad/:id', middlewares.auth, controllers.ad.delete);

module.exports = router;
