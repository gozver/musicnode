const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Role extends Model {}

Role.init({
  id:   { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: false } }
}, { 
  sequelize,
  modelName: 'role'
});

module.exports = Role;