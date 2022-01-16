const seed = require('./seeds');
const models = require('../models');
const db = require('../config/db');

// set relationships
require('../config/relationships');

// NOTE: run 'npm run mock-roles' to start using the platform 
// ROLES ARE INDISPENSABLE IN ORDER TO USE THE PLATFORM
db.sync({ force: true })
  .then(() => {
    // create synchronized db conection
    console.log('--> db synchronization success');
  })
  .then(async () => {
    // insert roles in the db  
    for (let role of seed.role) {
      await models.role.create(role);
    }
  });
    