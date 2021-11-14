const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Band extends Model {}

Band.init({
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
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { notEmpty: false }
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: false }
  },
  scope: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: false }
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, { 
  sequelize,
  modelName: 'band'
});

module.exports = Band;