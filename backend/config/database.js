const mysql = require('mysql2');
const config = require('./config.json');

// create a pool conection
const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

module.exports = pool.promise();