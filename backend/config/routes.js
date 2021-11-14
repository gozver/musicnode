const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');

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
router.post   ('/ad',     authMiddleware, controllers.ad.create);
router.get    ('/ads',    authMiddleware, controllers.ad.findAll);
router.get    ('/ad/:id', authMiddleware, controllers.ad.findByPk);
router.patch  ('/ad/:id', authMiddleware, controllers.ad.update);
router.delete ('/ad/:id', authMiddleware, controllers.ad.delete);

module.exports = router;
