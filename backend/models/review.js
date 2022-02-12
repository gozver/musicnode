const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

class Review extends Model {}

Review.init({
  id:     { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },

  body:   { type: DataTypes.TEXT,    allowNull: false, validate: { notEmpty: true } },
  
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: false } },
  userId: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: false } },
  bandId: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: false } },
}, { 
  sequelize,
  modelName: 'review'
});

module.exports = Review;