const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/auth')

router.post('/login', authController.login);

router.post(
  '/signup',
  
  // validations: https://express-validator.github.io/docs/
  body('name')
    .not()
    .isEmpty(),
  body('surname')
    .not()
    .isEmpty(),
  // email validation with a custom function to check if the exists in the db
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom(async (email) => {      
      const user = await User.find(email);
      if (user[0].length > 0) return Promise.reject('The email already exists!');
    })
    .normalizeEmail(),
  body('phone')
    .trim()
    .not()
    .isEmpty(),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Please enter a valid password'),
  
  authController.signup
);

module.exports = router;