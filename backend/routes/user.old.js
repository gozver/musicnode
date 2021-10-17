const express = require('express');
const router = express.Router();

const connection = require('../config/connection');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, rows, fields) => {
    if (!error) {
      res.send(rows);
    } else {
      console.log(error);
    }
  });
});

router.post('/signin', (req, res) => {
  const { name, password } = req.body;

  connection.query('SELECT * FROM users WHERE name=? AND password=?', [name, password], (error, rows, fields) => {
    if (!error) {
      if (rows.length > 0) {
        let user = JSON.stringify(rows[0]);
        const token = jwt.sign(user, 'secret-key');
        res.json({token});
      } else {
        res.json('--> Invalid username or password')
      }
    } else {
      console.log(error);
    }
  });
});

router.post('/test', verifyToken, (req, res) => {
  console.log('--> req.data:', req.data);
  res.json(req.data);
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) res.status(401).json('Unauthorized');

  const token = req.headers.authorization.substr(7);  
  console.log('--> Token:', token);

  if (token !== '') {
    const content = jwt.verify(token, 'secret-key');
    // console.log('--> Content:', content);

    req.data = content;
    next();
  } else {
    res.status(401).json('Invalid token');
  }
}

module.exports = router;