const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

class Company extends Model {}

Company.init({
  id:      { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },

  name:    { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: false } },
  desc:    { type: DataTypes.TEXT,    allowNull: false, validate: { notEmpty: false } },
  
  email:   { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true, isEmail: true }, unique: true },
  
  phone:   { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: false } },
  address: { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: false } },

  avatar:  { type: DataTypes.STRING,  allowNull: true,  defaultValue: 'assets/images/user.png' },
}, { 
  sequelize,
  modelName: 'company'
});

module.exports = Company;