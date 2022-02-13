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

  .get    ('/user',                       controllers.user.findAll)
  .get    ('/user/:id', middlewares.auth, controllers.user.findOne)
  .patch  ('/user',     storage.avatar,   controllers.user.updateAvatar)

  .get    ('/role', controllers.role.findAll)

  .get    ('/band',                       controllers.band.findAll)
  .get    ('/band/:id', middlewares.auth, controllers.band.findOne)
  .post   ('/band',     middlewares.auth, controllers.band.create)
  .patch  ('/band',     storage.avatar,   controllers.band.updateAvatar)
  .delete ('/band/:id', middlewares.auth, controllers.band.deleteImages)

  .get    ('/company',                   controllers.company.findAll)
  .post   ('/company', middlewares.auth, controllers.company.create)

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
