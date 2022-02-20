const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');
const storage = require('../storage');

/**
 * @info get endpoint data from the browser: 'http://localhost:3000/api/model_name'
 * @info no auth middleware in find all to allow users to fetch the endpoints data from the browser
 * @info no auth middleware in methods that are used before login
 */

router
  .post   ('/auth/login',  controllers.auth.login)
  .post   ('/auth/signup', controllers.auth.signup)

  .get    ('/user',                          controllers.user.findAll)
  .get    ('/user/params', middlewares.auth, controllers.user.findAllByParams)
  .get    ('/user/:id',    middlewares.auth, controllers.user.findOne)
  .patch  ('/user',        storage.avatar,   controllers.user.updateAvatar)
  .patch  ('/user/info',   middlewares.auth, controllers.user.updateInfo)
  .patch  ('/user/role',   middlewares.auth, controllers.user.updateActiveRole)

  .get    ('/role',                       controllers.role.findAll)
  .get    ('/role/:id', middlewares.auth, controllers.role.findAllByUserId)

  .get    ('/band',                          controllers.band.findAll)
  .get    ('/band/params', middlewares.auth, controllers.band.findAllByParams)
  .get    ('/band/:id',    middlewares.auth, controllers.band.findOne)
  .post   ('/band',        middlewares.auth, controllers.band.create)
  .patch  ('/band',        storage.avatar,   controllers.band.updateAvatar)
  .patch  ('/band/multi',  storage.multi,    controllers.band.updateImages)
  .patch  ('/band/info',   middlewares.auth, controllers.band.updateInfo)
  .delete ('/band/:id',    middlewares.auth, controllers.band.deleteImages)
  
  .get    ('/company',                          controllers.company.findAll)
  .get    ('/company/params', middlewares.auth, controllers.company.findAllByParams)
  .get    ('/company/:id',    middlewares.auth, controllers.company.findOne)
  .post   ('/company',        middlewares.auth, controllers.company.create)
  .patch  ('/company',        storage.avatar,   controllers.company.updateAvatar)
  .patch  ('/company/multi',  storage.multi,    controllers.company.updateImages)
  .patch  ('/company/info',   middlewares.auth, controllers.company.updateInfo)
  .delete ('/company/:id',    middlewares.auth, controllers.company.deleteImages)

  .get    ('/ad',                       controllers.ad.findAll)
  .post   ('/ad',     middlewares.auth, controllers.ad.create)
  .get    ('/ad/:id', middlewares.auth, controllers.ad.findOne)
  .patch  ('/ad/:id', middlewares.auth, controllers.ad.update)
  .delete ('/ad/:id', middlewares.auth, controllers.ad.delete)
  
  .get    ('/message',                            controllers.message.findAll)
  .get    ('/message/:from:to', middlewares.auth, controllers.message.findAllByUsersIds)
  .post   ('/message',          middlewares.auth, controllers.message.create)

  .get    ('/review/:bandId', middlewares.auth, controllers.review.findAll)
  .post   ('/review',         middlewares.auth, controllers.review.create)

  .post   ('/email',  controllers.email.sendContactEmail);

module.exports = router;
