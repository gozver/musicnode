const mysql = require('mysql2');
const config = require('./config.json');

// create a pool conection
const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

module.exports = pool.promise();