const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

const storage = require('../config/storage');

// no auth middleware in find all to allow users to fetch the endpoints data from the browser
// no auth middleware in methods that are used before login
router
  .post   ('/auth/login',         controllers.auth.login)
  .post   ('/auth/signup',        controllers.auth.signup)
  .patch  ('/auth/updateHasRole', controllers.auth.updateHasRole)

  // 'http://localhost:3000/api/user'
  .get    ('/user',                       controllers.user.findAll)
  .get    ('/user/:id', middlewares.auth, controllers.user.findOne)
  .post   ('/user',     storage,          controllers.user.updateAvatar)

  // 'http://localhost:3000/api/role'
  .get    ('/role', controllers.role.findAll)

  // 'http://localhost:3000/api/user-role'
  .get    ('/user-role',         controllers.userRole.findAll)
  .post   ('/user-role',         controllers.userRole.create)
  .get    ('/user-role/:userId', controllers.userRole.findByUserId)

  // 'http://localhost:3000/api/band'
  .get    ('/band',                   controllers.band.findAll)
  .post   ('/band', middlewares.auth, controllers.band.create)

  // 'http://localhost:3000/api/company'
  .get    ('/company',                   controllers.company.findAll)
  .post   ('/company', middlewares.auth, controllers.company.create)

  // 'http://localhost:3000/api/ad'
  .get    ('/ad',                       controllers.ad.findAll)
  .post   ('/ad',     middlewares.auth, controllers.ad.create)
  .get    ('/ad/:id', middlewares.auth, controllers.ad.findOne)
  .patch  ('/ad/:id', middlewares.auth, controllers.ad.update)
  .delete ('/ad/:id', middlewares.auth, controllers.ad.delete)
  
  // no 'http://localhost:3000/api/message'
  .get    ('/message',                            controllers.message.findAll)
  .get    ('/message/:from:to', middlewares.auth, controllers.message.findAllByUsersIds)
  .post   ('/message',          middlewares.auth, controllers.message.create)

  // no 'http://localhost:3000/api/email'
  .post   ('/email',  controllers.email.sendEmail);

module.exports = router;
