const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

class Band extends Model {}

Band.init({
  id:     { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },

  name:   { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: false } },
  desc:   { type: DataTypes.TEXT,    allowNull: false, validate: { notEmpty: false } },
 
  email:  { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true, isEmail: true }, unique: true },
   
  phone:  { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: false } },
  price:  { type: DataTypes.FLOAT,   allowNull: false, validate: { notEmpty: false } },
  type:   { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: false } },
  scope:  { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: false } },
  video:  { type: DataTypes.STRING,  allowNull: true },
  
  avatar: { type: DataTypes.STRING,  allowNull: true,  defaultValue: 'assets/img/user.png' },
}, { 
  sequelize,
  modelName: 'band'
});

module.exports = Band;