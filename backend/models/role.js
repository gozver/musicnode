const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

class Role extends Model {}

Role.init({
  id:        { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  
  roleId:    { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: false } },
  role:      { type: DataTypes.STRING,  allowNull: false, validate: { notEmpty: false } },
  userId:    { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: false } },
  bandId:    { type: DataTypes.INTEGER, allowNull: true },
  companyId: { type: DataTypes.INTEGER, allowNull: true }
}, { 
  sequelize,
  modelName: 'role'
});

module.exports = Role;