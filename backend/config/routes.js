const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

// no auth middleware in find all to allow users to fetch the endpoints data from the browser
// no auth middleware in methods that are used before login
router
  .post   ('/auth/login', controllers.auth.login)
  .post   ('/auth/signup', controllers.auth.signup)
  .patch  ('/auth/updateHasRole', controllers.auth.updateHasRole)

  // 'http://127.0.0.1:3000/api/role
  .get    ('/role', controllers.role.findAll)

  // 'http://127.0.0.1:3000/api/band
  .get    ('/band', controllers.band.findAll)
  .post   ('/band', controllers.band.create)

  // 'http://127.0.0.1:3000/api/company
  .get    ('/company', controllers.company.findAll)
  .post   ('/company', controllers.company.create)

  // 'http://127.0.0.1:3000/api/ad
  .get    ('/ad',                       controllers.ad.findAll)
  .post   ('/ad',     middlewares.auth, controllers.ad.create)
  .get    ('/ad/:id', middlewares.auth, controllers.ad.findOne)
  .patch  ('/ad/:id', middlewares.auth, controllers.ad.update)
  .delete ('/ad/:id', middlewares.auth, controllers.ad.delete)
  
  .post   ('/email',  controllers.email.sendEmail)
  
  // 'http://localhost:3000/api/user-role'
  .get    ('/user-role', controllers.userRole.findAll)
  .post   ('/user-role', controllers.userRole.create)
  .get    ('/user-role/:userId', controllers.userRole.findByUserId)

  .get    ('/user', middlewares.auth, controllers.user.findOne);

module.exports = router;
