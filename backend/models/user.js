const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  surname: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // avatar: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  //   defaultValue: 'assets/images/user.png'
  // },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      // validatePassword: validatePassword
    }
  }  
}, { 
  sequelize, 
  modelName: 'user' 
});

module.exports = User;