const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

/**
 * @note1 no auth middleware in find all to allow users to fetch the endpoints data from the browser
 * @note2 no auth middleware in methods that are used before login
 * @note3 fetch data from the brouser: 'http://127.0.0.1:3000/model'
 */

router
  .post   ('/auth/login',  controllers.auth.login)
  .post   ('/auth/signup', controllers.auth.signup)

  .get    ('/role', controllers.role.findAll)

  .get    ('/band', controllers.band.findAll)
  .post   ('/band', controllers.band.create)

  .get    ('/company', controllers.company.findAll)
  .post   ('/company', controllers.company.create)

  .get    ('/ad',                       controllers.ad.findAll)
  .post   ('/ad',     middlewares.auth, controllers.ad.create)
  .get    ('/ad/:id', middlewares.auth, controllers.ad.findOne)
  .patch  ('/ad/:id', middlewares.auth, controllers.ad.update)
  .delete ('/ad/:id', middlewares.auth, controllers.ad.delete);

module.exports = router;
