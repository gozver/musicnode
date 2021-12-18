const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

// no middleware in find all to get the endpoints data from the browser

router
  // auth
  .post   ('/auth/login',  controllers.auth.login)
  .post   ('/auth/signup', controllers.auth.signup)

  // role: no findAll auth middleware to allow access to 'http://127.0.0.1:3000/role/band' from chrome
  .get    ('/role', controllers.role.findAll)

  // band: no findAll auth middleware to allow access to 'http://127.0.0.1:3000/band/band' from chrome
  .get    ('/band', controllers.band.findAll)
  .post   ('/band', controllers.band.create)

  // company: no findAll auth middleware to allow access to 'http://127.0.0.1:3000/company/band' from chrome
  .get    ('/company', controllers.company.findAll)

  // ad: no findAll auth middleware to allow access to 'http://127.0.0.1:3000/ad/band' from chrome
  .get    ('/ad',                       controllers.ad.findAll)
  .post   ('/ad',     middlewares.auth, controllers.ad.create)
  .get    ('/ad/:id', middlewares.auth, controllers.ad.findOne)
  .patch  ('/ad/:id', middlewares.auth, controllers.ad.update)
  .delete ('/ad/:id', middlewares.auth, controllers.ad.delete);

module.exports = router;
