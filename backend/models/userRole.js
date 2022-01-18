const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

class UserRole extends Model {}

UserRole.init({
  id:        { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  userId:    { type: DataTypes.INTEGER, allowNull: false },
  roleId:    { type: DataTypes.INTEGER, allowNull: false },
  bandId:    { type: DataTypes.INTEGER, allowNull: true  },
  companyId: { type: DataTypes.INTEGER, allowNull: true  },
}, {
  sequelize, 
  modelName: 'user_role'
});

module.exports = UserRole;