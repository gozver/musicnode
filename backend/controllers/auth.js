const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config/config.json');
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // find the user
    const user = await User.find(email);
    
    // user not found in the database
    if (user[0].length !== 1) {      
      const err = new Error();
      err.statusCode = 401;
      err.message = 'The email do not exists in the database';
      next(err);
    }

    // check the password
    const pwdIsEqual = await bcrypt.compare(password, user[0][0].password);
    
    // password incorrect
    if (!pwdIsEqual) {
      const err = new Error();
      err.statusCode = 401;
      err.message = 'The password is not correct';
      next(err);
    }

    // email and password are correct
    const params = { 
      email: user[0][0].email,
      userId: user[0][0].id 
    };

    const expiresIn = { 
      expiresIn: '24h'
    };

    // create a jwt
    const token = jwt.sign(params, config.secretKey, expiresIn);
  
    // return response to the client
    res.status(200).json({ 
      token: token,
      id: user[0][0].id,
      name: user[0][0].name,
      surname: user[0][0].surname,
      email: user[0][0].email,
      phone: user[0][0].phone
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
    console.log('> validation errors:', errors.errors);

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
      name,
      surname,
      email,
      phone,
      password: hashedPwd      
    };

    // save the user
    await User.save(user);

    // return response to the client
    res.status(201).json({ message: 'Signup success!' });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;

    next(err); // go to error controller
  }
};