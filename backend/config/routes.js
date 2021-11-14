const express = require('express');
const router = express.Router();

const adController = require('../controllers/ad');
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

// auth
router.post   ('/auth/login',  authController.login);
router.post   ('/auth/signup', authController.signup);

// ad
router.post   ('/ad',     authMiddleware, adController.create);
router.get    ('/ads',    authMiddleware, adController.findAll);
router.get    ('/ad/:id', authMiddleware, adController.findByPk);
router.patch  ('/ad/:id', authMiddleware, adController.update);
router.delete ('/ad/:id', authMiddleware, adController.delete);

module.exports = router;
