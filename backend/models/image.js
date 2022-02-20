const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

class Image extends Model {}

Image.init({
  id:        { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },

  adId:      { type: DataTypes.INTEGER, allowNull: true },
  bandId:    { type: DataTypes.INTEGER, allowNull: true },
  companyId: { type: DataTypes.INTEGER, allowNull: true },

  image:      { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: false } },
}, { 
  sequelize,
  modelName: 'image'
});

module.exports = Image;