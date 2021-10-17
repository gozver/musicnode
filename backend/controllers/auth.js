const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  // check for errors
  const errors = validationResult(req);
  
  // if errors, return errors in a json response
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  // if no errors, continue
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const dni = req.body.dni;
  const phone = req.body.phone;
  const password = req.body.password;
  
  // hash the password and save the user in the database
  try {
    const hashedPwd = await bcrypt.hash(password, 12) // hash the password 12 times
    
    const user = { 
      name: name,
      surname: surname,
      email: email,
      dni: dni,
      phone: phone,
      password: hashedPwd      
    };

    // save the user
    await User.save(user);

    res.status(201).json({ msg: 'User signed up successfully!' });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;

    next(err); // go to error controller
  }
};