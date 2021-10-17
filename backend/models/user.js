const db = require('../config/database');

module.exports = class User {
  // model definition
  constructor(name, surname, email, dni, phone, password) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.dni = dni;
    this.phone = phone;
    this.password = password;    
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
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
      'INSERT INTO users (name, surname, email, dni, phone, password) VALUES (?, ?, ?, ?, ?, ?)',
      [user.name, user.surname, user.email, user.dni, user.phone, user.password]
    );
  }
}