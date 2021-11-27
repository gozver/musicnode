const { Sequelize } = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(
  config.db.db,
  config.db.username,
  config.db.password, 
  {
    host: config.db.host,
    dialect: config.db.dialect, // mysql
    logging: console.log,       // show executed queries log on screen.
    keepDefaultTimezone: false, // no default zone
    timezone: "+01:00",         // spain default zone
    define: {
      timestamps: true,         // timestamps for tables (created_at, updated_at and deleted_at)
      paranoid: false,          // paranoid table: no hard deletion, instead deleted_at get a timestamp value      
      underscored: true,        // createdAt, userId... model attributes point to created_at, user-id... in the db
      freezeTableName: true     // the table name will be the same as the model name
    }
  }
);

module.exports = sequelize;