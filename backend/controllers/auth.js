const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config/config.json');
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.find(email);

    // user not found in the database
    if (user[0].length !== 1) {
      const error = new Error('The email do not exists in the database');
      error.statusCode = 401;
      throw error;
    }

    // password incorrect
    const dbUser = user[0][0];

    const pwdIsEqual = await bcrypt.compare(password, dbUser.password);

    if (!pwdIsEqual) {
      const error = new Error('The Password is not correct');
      error.statusCode = 401;
      throw error;
    }

    // email and password are correct => create a jwt
    const token = jwt.sign(
      {
        email: dbUser.email,
        userId: dbUser.id
      }, 
      config.secretKey,
      { 
        expiresIn: '1h' 
      }
    );
  
    // return response to the client
    res.status(200).json({ 
      token: token,
      userId: dbUser.id
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;

    next(err); // go to error controller
  }
}

exports.signup = async (req, res, next) => {
  // check for errors
  const errors = validationResult(req);
  
  // if errors, return errors in a json response
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.errors);

    return res.status(400).json({ errors: errors.array() });
  }

  // if no errors, continue
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  
  // hash the password and save the user in the database
  try {
    const hashedPwd = await bcrypt.hash(password, 12) // hash the password 12 times
    
    const user = { 
      name: name,
      surname: surname,
      email: email,      
      phone: phone,
      password: hashedPwd      
    };

    // save the user
    await User.save(user);

    res.status(201).json({ message: 'Signup success!' });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;

    next(err); // go to error controller
  }
};