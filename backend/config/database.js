const { Sequelize } = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password, 
  {
    host: config.db.host,
    dialect: config.db.dialect, // mysql
    logging: console.log,       // show executed queries log on screen.
    keepDefaultTimezone: false, // no default zone
    timezone:"+01:00",          // spain default zone
    define: {
      timestamps: true,         // timestamps for tables
      paranoid: false,          // paranoid table: no hard deletion, instead deletedAt get a timestamp value      
      underscored: true,        // createdAt, updatedAt... model attributes point to created_at, updated_at... in the db
      freezeTableName: true     // tableName will be the same as the model name
    }
  }
);

module.exports = sequelize;