const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class UserRole extends Model {}

UserRole.init({
  id:     { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  roleId: { type: DataTypes.INTEGER },
}, { 
  sequelize, 
  modelName: 'user_role'
});

module.exports = UserRole;