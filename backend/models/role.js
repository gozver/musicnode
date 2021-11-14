const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role: {
    type: DataTypes.STRING,
    validate: { notEmpty: false }
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'assets/images/user.png'
  },
  // userId: {
  //   type: DataTypes.INTEGER,
  //   validate: { notEmpty: false }
  // },
  // bandId: {
  //   type: DataTypes.INTEGER,
  //   validate: { notEmpty: false }
  // },
  // companyId: {
  //   type: DataTypes.INTEGER,
  //   validate: { notEmpty: false }
  // },
}, { 
  sequelize,
  modelName: 'role'
});

module.exports = Role;