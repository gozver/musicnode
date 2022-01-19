const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

class Role extends Model {}

Role.init({
  id:     { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  
  userId: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: false } },
  roleId: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: false } },
  role:   { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: false } }
}, { 
  sequelize,
  modelName: 'role'
});

module.exports = Role;