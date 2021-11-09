const express = require('express');
const router = express.Router();

const adController = require('../controllers/ad');
const authMiddleware = require('../middleware/auth');

router.post   ('/',    authMiddleware, adController.create);
router.get    ('/',    authMiddleware, adController.findAll);
router.get    ('/:id', authMiddleware, adController.findByPk);
router.patch  ('/:id', authMiddleware, adController.update);
router.delete ('/:id', authMiddleware, adController.delete);

module.exports = router;