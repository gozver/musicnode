const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Company extends Model {}

Company.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    validate: { notEmpty: false }
  },
  description: {
    type: DataTypes.TEXT,
    validate: { notEmpty: false }
  },
  phone: {
    type: DataTypes.STRING,
    validate: { notEmpty: false }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { notEmpty: true, isEmail: true }
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'assets/images/user.png'
  },
  address: {
    type: DataTypes.STRING,
    validate: { notEmpty: false }
  },
}, { 
  sequelize,
  modelName: 'company'
});

module.exports = Company;