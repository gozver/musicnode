const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Ad extends Model {}

Ad.init({
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
  title: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    validate: {
      notEmpty: true
    }
  },
}, { 
  sequelize,      // db
  modelName: 'ad' // model
});

module.exports = Ad;


// const db = require('../config/database');

// module.exports = class Ad {
//   // model definition
//   constructor(userId, title, description) {
//     this.userId = userId;
//     this.title = title;
//     this.description = description;
//     this.createdAt = createdAt;
//     this.updatedAt = updatedAt;
//     this.deletedAt = deletedAt;
//   }
  
//   static fetchAds() {
//     return db.execute('SELECT * FROM ads ORDER BY updatedAt DESC');
//   }

//   static createAd(ad) {
//     return db.execute(
//       'INSERT INTO ads (userId, title, description) VALUES (?, ?, ?)',
//       [ad.userId, ad.title, ad.description]
//     );
//   }

//   static deleteAd(id) {
//     return db.execute('DELETE FROM ads WHERE id = ?', [id]);
//   }
// }