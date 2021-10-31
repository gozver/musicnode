const db = require('../config/database');

module.exports = class User {
  // model definition
  constructor(name, surname, email, phone, password) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.password = password;    
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  // set the hability to find an user by the email
  static find(email) {
    return db.execute(
      'SELECT * FROM users WHERE email = ?', [email]
    );
  }

  // set the hability to save an user
  static save(user) {
    return db.execute(
      'INSERT INTO users (name, surname, email, phone, password) VALUES (?, ?, ?, ?, ?)',
      [user.name, user.surname, user.email, user.phone, user.password]
    );
  }
}