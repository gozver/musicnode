const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

class Musician extends Model {}

Musician.init({
  id:     { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },

  desc:   { type: DataTypes.TEXT,    allowNull: false, validate: { notEmpty: false } },
  type:   { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: false } },
  video:  { type: DataTypes.STRING,  allowNull: true },
  
  userId: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: false } },
}, { 
  sequelize,
  modelName: 'musician'
});

module.exports = Musician;