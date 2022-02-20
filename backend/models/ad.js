const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

class Ad extends Model {}

Ad.init({
  id:       { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },

  title:    { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true } },
  price:    { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true } },
  location: { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: true } },
  desc:     { type: DataTypes.TEXT,    allowNull: false, validate: { notEmpty: true } },
  
  userId:   { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: false } },
}, { 
  sequelize,
  modelName: 'ad'
});

module.exports = Ad;