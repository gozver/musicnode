const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

class User extends Model {}

User.init({
  id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  
  name:       { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true } },
  surname:    { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true } },
  phone:      { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true } },
  password:   { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true } },
  
  email:      { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true, isEmail: true }, unique: true },
  hasRole:    { type: DataTypes.BOOLEAN, allowNull: false, validate: { notEmpty: true } },
  activeRole: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: true }, defaultValue: 0 },
  
  avatar:     { type: DataTypes.STRING,  allowNull: true,  defaultValue: 'assets/img/user.png' },
}, { 
  sequelize, 
  modelName: 'user' 
});

module.exports = User;