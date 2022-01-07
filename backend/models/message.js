const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Message extends Model {}

Message.init({
  id:        { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  body:      { type: DataTypes.TEXT,    allowNull: false, validate: { notEmpty: false } },
  userId:    { type: DataTypes.INTEGER, allowNull: false  },
  recipient: { type: DataTypes.INTEGER, allowNull: false  },
}, { 
  sequelize,
  modelName: 'message'
});

module.exports = Message;