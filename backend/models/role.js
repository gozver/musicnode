const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  bandId: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  companyId: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  role: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'assets/images/user.png'
  },
}, { 
  sequelize,
  modelName: 'role'
});

module.exports = Role;