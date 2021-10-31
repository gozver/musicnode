const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const adController = require('../controllers/ad');
const authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, adController.findAll);

router.post(
  '/',
  
  // validations: https://express-validator.github.io/docs/
  [
    authMiddleware,
    body('userId').not().isEmpty(),
    body('title').not().isEmpty(),
    body('description').not().isEmpty()
  ],
  
  adController.create
);

router.delete('/:id', authMiddleware, adController.delete);

module.exports = router;