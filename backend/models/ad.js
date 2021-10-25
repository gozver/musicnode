const db = require('../config/database');

module.exports = class Ad {
  // model definition
  constructor(user_id, title, description) {
    this.user_id = user_id;
    this.title = title;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
  
  static fetchAds() {
    return db.execute('SELECT * FROM ads ORDER BY updated_at DESC');
  }

  static createAd(ad) {
    return db.execute(
      'INSERT INTO ads (user_id, title, description) VALUES (?, ?, ?)',
      [ad.user_id, ad.title, ad.description]
    );
  }

  static deleteAd(id) {
    return db.execute('DELETE FROM ads WHERE id = ?', [id]);
  }
}