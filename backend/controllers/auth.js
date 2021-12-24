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
    })
    // user not found
    .catch(() => {
      // create error
      const err = new Error();
      err.statusCode = 401;
      err.message = 'The email do not exists in the db';

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
        err.message = 'The email already exists in the db';
        next(err);
      }
    });

  // if the email does not exist, continue
  const name = req.body.name;
  const surname = req.body.surname;  
  const phone = req.body.phone;
  const password = req.body.password;
  const roleId = req.body.roleId;

  let userId;
  
  // hash the password 12 times
  const hashedPwd = await bcrypt.hash(password, 12)
  
  // save the user in the db
  await models.user.create({ name, surname, email, phone, password: hashedPwd })
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

  // create the roles in the db: comment these 3 methods after creating the 1st user
  await models.role.create({ name: 'band' });
  await models.role.create({ name: 'company' });
  await models.role.create({ name: 'admin'});

  // save the USER ROLE relationship in the db
  await models.userRole.create({ 
    userId: userId,
    roleId: roleId
  });
};