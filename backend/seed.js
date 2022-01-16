// includes
const db = require('./config/db');
const models = require('./models');

// import data
const roles = require('./seeds/role');
const adminUsers = require('./seeds/adminUser');
const adminUserRoles = require('./seeds/adminUserRole');
const contractorUsers = require('./seeds/contractorUser');
const contractorUserRoles = require('./seeds/contractorUserRole');
const musicianUsers = require('./seeds/musicianUser');
const musicianUserRoles = require('./seeds/musicianUserRole');
const bands = require('./seeds/band');
const bandUsers = require('./seeds/bandUser');
const bandUserRoles = require('./seeds/bandUserRole');
const companies = require('./seeds/company');
const companyUsers = require('./seeds/companyUser');
const companyUserRoles = require('./seeds/companyUserRole');

// set relationships
require('./config/relationships');

/**
 * run 'node seed' to insert these data into the db
 */
db.sync({ force: true })
  // create db conection (sync)
  .then(() => console.log('--> db synchronization success'))
  .then(async () => {
    // insert roles in the db  
    for (let role of roles) {
      await models.role.create(role);
    }
  })
  // .then(async () => {
  //   // insert admin users in the db
  //   for (let adminUser of adminUsers) {
  //     await models.user.create(adminUser);
  //   }
  // })
  // .then(async () => {
  //   // insert admin userRoles in the db
  //   for (let adminUserRole of adminUserRoles) {
  //     await models.userRole.create(adminUserRole);
  //   }
  // })
  // .then(async () => {
  //   // insert contractor users in the db
  //   for (let contractorUser of contractorUsers) {
  //     await models.user.create(contractorUser);
  //   }
  // })
  // .then(async () => {
  //   // insert admin userRoles in the db
  //   for (let contractorUserRole of contractorUserRoles) {
  //     await models.userRole.create(contractorUserRole);
  //   }
  // })
  // .then(async () => {
  //   // insert musician users in the db
  //   for (let musicianUser of musicianUsers) {
  //     await models.user.create(musicianUser);
  //   }
  // })
  // .then(async () => {
  //   // insert musician userRoles in the db
  //   for (let musicianUserRole of musicianUserRoles) {
  //     await models.userRole.create(musicianUserRole);
  //   }
  // })
  // .then(async () => {
  //   // insert bands in the db
  //   for (let band of bands) {
  //     await models.band.create(band);
  //   }
  // })
  // .then(async () => {
  //   // insert band users in the db
  //   for (let bandUser of bandUsers) {
  //     await models.user.create(bandUser);
  //   }
  // })
  // .then(async () => {
  //   // insert band userRoles in the db
  //   for (let bandUserRole of bandUserRoles) {
  //     await models.userRole.create(bandUserRole);
  //   }
  // })
  // .then(async () => {
  //   // insert companies in the db
  //   for (let company of companies) {
  //     await models.company.create(company);
  //   }
  // })
  // .then(async () => {
  //   // insert company users in the db
  //   for (let companyUser of companyUsers) {
  //     await models.user.create(companyUser);
  //   }
  // })
  // .then(async () => {
  //   // insert company userRoles in the db
  //   for (let companyUserRole of companyUserRoles) {
  //     await models.userRole.create(companyUserRole);
  //   }
  // });

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
    