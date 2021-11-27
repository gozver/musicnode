const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING,
    validate: { notEmpty: false }
  }
}, { 
  sequelize,
  modelName: 'role'
});

module.exports = Role;