const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Message extends Model {}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  body: {
    type: DataTypes.STRING,
    validate: { notEmpty: false }
  }
}, { 
  sequelize,
  modelName: 'message'
});

module.exports = Message;