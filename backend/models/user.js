const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {}

User.init({
  id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  
  name:     { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true } },
  surname:  { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true } },
  phone:    { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true } },
  password: { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true } },

  email:    { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true, isEmail: true }, unique: true },
}, { 
  sequelize, 
  modelName: 'user' 
});

module.exports = User;