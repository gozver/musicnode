const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config/config.json');
const User = require('../models/user');

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // find the user
  await User.findOne({
    where: { email }
  }).then(async (user) => {
    const isEmpty = Object.keys(user).length === 0;

    // user not found in the database
    if (isEmpty) {
      const err = new Error();
      err.statusCode = 401;
      err.message = 'The email do not exists in the database';
      next(err);
    }

    // check the password
    const pwdIsEqual = await bcrypt.compare(password, user.password);

    // password incorrect
    if (!pwdIsEqual) {
      const err = new Error();
      err.statusCode = 401;
      err.message = 'The password is not correct';
      next(err);
    }

    // email and password are correct
    const params = { 
      email: user.email,
      userId: user.id 
    };

    const expiresIn = { 
      expiresIn: '24h'
    };

    // create a jwt
    const token = jwt.sign(params, config.secretKey, expiresIn);

    // return response to the client
    res.status(200).json({ 
      token: token,
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone
    });
  });
}

exports.signup = async (req, res, next) => {
  // check for errors
  // const errors = validationResult(req);
  
  // // if errors, return errors in a json response
  // if (!errors.isEmpty()) {
  //   console.log('> validation errors:', errors.errors);

  //   return res.status(400).json({ errors: errors.array() });
  // }

  // if no errors, continue
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  
  // hash the password 12 times
  const hashedPwd = await bcrypt.hash(password, 12)
  
  // save the user in the database
  await User.create({
    name,
    surname,
    email,
    phone,
    password: hashedPwd
  }).then(() => {
      // return response to the client
      res.status(201).json('User created!');
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err); // go to error controller
    });
};