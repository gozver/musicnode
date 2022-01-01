const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Role extends Model {}

Role.init({
  id:   { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: false } },
  name: { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: false } }
}, { 
  sequelize,
  modelName: 'role'
});

module.exports = Role;