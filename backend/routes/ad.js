const express = require('express');
const router = express.Router();
const adController = require('../controllers/ad');

router.post   ('/',    adController.create);
router.get    ('/',    adController.findAll);
router.get    ('/:id', adController.findByPk);
router.patch  ('/:id', adController.update);
router.delete ('/:id', adController.delete);

module.exports = router;