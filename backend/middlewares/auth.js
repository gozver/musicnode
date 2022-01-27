const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports = (req, res, next) => {
  // get the authorization header
  const authHeader = req.get('Authorization');

  // no authorization headers
  if (!authHeader) {
    const error = new error('User unauthorized');
    error.statusCode = 401;
    throw error;
  }

  // get the token => token convention: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  const token = authHeader.split(' ')[1];
  
  // check the JWT from the client
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, config.token.secretKey);
  } catch(err) {
    err.statusCode = 500;
    throw err;
  }

  // token not verified
  if (!decodedToken) {
    const error = new error('User unauthorized');
    error.statusCode = 401;
    throw error;
  }

  // token verified
  req.isLoggedIn = true;
  req.userId = decodedToken.userId;
  req.email = decodedToken.email;
  next();
}