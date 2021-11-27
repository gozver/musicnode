const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Ad extends Model {}

Ad.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    validate: {
      notEmpty: true
    }
  },
}, { 
  sequelize,
  modelName: 'ad'
});

module.exports = Ad;