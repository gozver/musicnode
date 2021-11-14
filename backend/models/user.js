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
    validate: { notEmpty: true, /* len: [2, 50] */ }
  },
  surname: {
    type: DataTypes.STRING,
    validate: { notEmpty: true }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { notEmpty: true, isEmail: true }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { /* validatePassword: validatePassword */ }
  }  
}, { 
  sequelize, 
  modelName: 'user' 
});

// function validatePassword(value) {
//   // (?=.*[a-z])  // at least one lower case letter
//   // (?=.*[A-Z])  // at least one upper case letter
//   // (?=.*\d)     // at least one digit
//   // (?=.*\W])    // at least one non-word character
//   const regexp = new RegExp(/(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
// 
//   if(!regexp.test(value)) {
//       throw new Error('Password must be 6 characters long and contain uppercase and lowercase letters and numbers');
//   }
// }

module.exports = User;