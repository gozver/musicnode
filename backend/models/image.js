const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

class Image extends Model {}

Image.init({
  id:         { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },

  adId:       { type: DataTypes.INTEGER, allowNull: true, validate: { notEmpty: false } },
  musicianId: { type: DataTypes.INTEGER, allowNull: true, validate: { notEmpty: false } },
  bandId:     { type: DataTypes.INTEGER, allowNull: true, validate: { notEmpty: false } },
  companyId:  { type: DataTypes.INTEGER, allowNull: true, validate: { notEmpty: false } },

  image:      { type: DataTypes.STRING,  allowNull: false },
}, { 
  sequelize,
  modelName: 'image'
});

module.exports = Image;