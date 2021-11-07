const { Sequelize } = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password, 
  {
    host: config.db.host,
    dialect: 'mysql'
  }
);

module.exports = sequelize;

// const mysql = require('mysql2');

// // create a pool conection
// const pool = mysql.createPool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database
// });

// module.exports = pool.promise();