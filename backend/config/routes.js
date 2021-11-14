const express = require('express');
const router = express.Router();

const middleware = require('../middlewares');

const controllers = require('../controllers');

// const authController = require('../controllers/auth');
// const userController = require('../controllers/user');
// const roleController = require('../controllers/role');
// const adController   = require('../controllers/ad');

// auth
router.post   ('/auth/login',  controllers.auth.login);
router.post   ('/auth/signup', controllers.auth.signup);

// user
router.get    ('/users',  controllers.user.findAll);

// role
router.get    ('/roles',  controllers.role.findAll);

// ad
router.post   ('/ad',     middleware.auth, controllers.ad.create);
router.get    ('/ads',    middleware.auth, controllers.ad.findAll);
router.get    ('/ad/:id', middleware.auth, controllers.ad.findByPk);
router.patch  ('/ad/:id', middleware.auth, controllers.ad.update);
router.delete ('/ad/:id', middleware.auth, controllers.ad.delete);

module.exports = router;
