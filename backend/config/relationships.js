const models = require('../models');

// one to many 
models.user.hasMany(models.ad, { foreignKey: 'userId' }); // adds a userId key to ad table
models.ad.belongsTo(models.user);                         // adds a userId key to ad table

// one to many
models.user.hasMany(models.message, { foreignKey: 'userId' }); // adds a userId key to ad table
models.message.belongsTo(models.user);                         // adds a userId key to ad table

// one to one
models.role.hasOne(models['band'], { foreignKey: 'roleId' }); // adds a userId key to ad table
models.band.belongsTo(models['role']);                        // adds a userId key to ad table

// one to one
models.role.hasOne(models['company'], { foreignKey: 'roleId' }); // adds a roleId to ad table
models.company.belongsTo(models['role']);                        // adds a roleId to ad table

// USER ROLE relationship: many to many
// each one of the 2 lines below creates a user_role table in the db
models.user.belongsToMany(models.role, { through: 'user_role' });
models.role.belongsToMany(models.user, { through: 'user_role' });