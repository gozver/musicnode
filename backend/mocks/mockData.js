const seed = require('./seeds');
const models = require('../models');
const db = require('../config/db');

// set relationships
require('../config/relationships');

// NOTE: run 'npm run mock-data' to insert mocked data into the db
db.sync({ force: true })
  .then(() => {
    // create synchronized db conection
    console.log('--> db synchronization success');
  })
  .then(async () => {
    // insert roles into the db  
    for (let role of seed.role) {
      await models.role.create(role);
    }
  })
  .then(async () => {
    // insert admin users into the db
    for (let adminUser of seed.adminUser) {
      await models.user.create(adminUser);
    }
  })
  .then(async () => {
    // insert admin userRoles into the db
    for (let adminUserRole of seed.adminUserRole) {
      await models.userRole.create(adminUserRole);
    }
  })
  .then(async () => {
    // insert contractor users into the db
    for (let contractorUser of seed.contractorUser) {
      await models.user.create(contractorUser);
    }
  })
  .then(async () => {
    // insert admin userRoles into the db
    for (let contractorUserRole of seed.contractorUserRole) {
      await models.userRole.create(contractorUserRole);
    }
  })
  .then(async () => {
    // insert musician users into the db
    for (let musicianUser of seed.musicianUser) {
      await models.user.create(musicianUser);
    }
  })
  .then(async () => {
    // insert musician userRoles into the db
    for (let musicianUserRole of seed.musicianUserRole) {
      await models.userRole.create(musicianUserRole);
    }
  })
  .then(async () => {
    // insert bands into the db
    for (let band of seed.band) {
      await models.band.create(band);
    }
  })
  .then(async () => {
    // insert band users into the db
    for (let bandUser of seed.bandUser) {
      await models.user.create(bandUser);
    }
  })
  .then(async () => {
    // insert band userRoles into the db
    for (let bandUserRole of seed.bandUserRole) {
      await models.userRole.create(bandUserRole);
    }
  })
  .then(async () => {
    // insert companies into the db
    for (let company of seed.company) {
      await models.company.create(company);
    }
  })
  .then(async () => {
    // insert company users into the db
    for (let companyUser of seed.companyUser) {
      await models.user.create(companyUser);
    }
  })
  .then(async () => {
    // insert company userRoles into the db
    for (let companyUserRole of seed.companyUserRole) {
      await models.userRole.create(companyUserRole);
    }
  });

// const ads = [
//   { title: 'Title 1',  description: 'Description 1',  userId: 1 },
//   { title: 'Title 2',  description: 'Description 2',  userId: 1 },
//   { title: 'Title 3',  description: 'Description 3',  userId: 1 },
//   { title: 'Title 4',  description: 'Description 4',  userId: 1 },
//   { title: 'Title 5',  description: 'Description 5',  userId: 2 },
//   { title: 'Title 6',  description: 'Description 6',  userId: 2 },
//   { title: 'Title 7',  description: 'Description 7',  userId: 2 },
//   { title: 'Title 8',  description: 'Description 8',  userId: 2 },
//   { title: 'Title 9',  description: 'Description 9',  userId: 3 },
//   { title: 'Title 10', description: 'Description 10', userId: 3 }  
// ];
    