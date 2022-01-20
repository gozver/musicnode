const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config/config.json');
const models = require('../models');

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const whereString = {
    where: { email }
  };
  
  await models.user.findOne(whereString)
    // user found
    .then(async (user) => {
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

      // create a jwt
      const expiresIn = { 
        expiresIn: '24h'
      };

      const token = jwt.sign(params, config.secretKey, expiresIn);

      // return response to the client
      res.status(200).json({ 
        token: token,
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        hasRole: user.hasRole,
        activeRole: user.activeRole
      });
    })
    // user not found
    .catch(() => {
      // create error
      const err = new Error();
      err.statusCode = 401;
      err.message = 'The email does not exist in the database';

      // print error and send it to error controller
      console.log('--> error:');
      console.log(err);
      next(err);
    });
}

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const whereString = { where: { email } };

  // check if the email exists
  await models.user.findOne(whereString)
    .then((res) => {
      if (res) {
        const err = new Error();
        err.statusCode = 401;
        err.message = 'The email already exists in the database';
        next(err);
      }
    });

  // if the email does not exist, continue
  const name = req.body.name;
  const surname = req.body.surname;  
  const phone = req.body.phone;
  const password = req.body.password;
  const code = req.body.code;
  
  let roleId = req.body.roleId;
  let userId, hasRole;
  
  // check admin code if user select admin role
  if (parseInt(roleId) === 5 && parseInt(code) !== 123) {
    const err = new Error();
    err.statusCode = 401;
    err.message = 'The administrator code is not correct';
    next(err);
  } else {
    // hash the password 12 times
    const hashedPwd = await bcrypt.hash(password, 12)
    
    // set has role value and check if the user has an active role
    if (parseInt(roleId) === 1 || parseInt(roleId) === 4 || parseInt(roleId) === 5) {
      hasRole = true;
    } else {
      hasRole = false;
      roleId = 0;
    }
    
    // save the user into the db
    await models.user.create({ name, surname, email, phone, password: hashedPwd, hasRole, activeRole: roleId })
      .then((user) => {
        // save the userId to operate with later
        userId = user.id;

        // return response to the client
        res.status(201).json(user);
      })
      .catch(err => {
        if (!err.statusCode) err.statusCode = 500;

        // print error and send it to error controller
        console.log('--> error:');
        console.log(err);
        next(err);
      });

    // if the user is a musician, a contractor or an admin, create user-role
    // if the user belogns to a band or a company, we'll create user-role later
    if (hasRole) {
      let role;

      switch(true) {
        case roleId === '1':
          role = 'musician';
          break;
        case roleId === '4':
          role = 'contractor';
          break;
        case roleId === '5':
          role = 'admin';
          break;
      }

      // save the new role in the db
      await models.role.create({ userId, roleId: roleId, role });
    }
  }
};