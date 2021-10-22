const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const adController = require('../controllers/ad');

router.get('/', adController.findAll);

router.post(
  '/',
  
  // validations: https://express-validator.github.io/docs/
  body('user_id')
    .not()
    .isEmpty(),
  body('title')
    .not()
    .isEmpty(),
  body('description')
    .not()
    .isEmpty(),
  
  adController.create
);

router.delete('/:id', adController.delete);

module.exports = router;