const models = require('../models');

// USER / ROLE => MANY TO MANY: duplicated entries allowed
models.user.belongsToMany(models.role, { 
  through: { model: models.userRole, unique: false }
});

models.role.belongsToMany(models.user, { 
  through: { model: models.userRole, unique: false }
});

// USER-ROLE / BAND => ONE TO ONE
models.userRole.belongsTo(models.band, { 
  foreignKey: 'bandId', onDelete: 'cascade', onUpdate: 'cascade' 
});

models.band.hasOne(models.userRole);

// USER-ROLE / COMPANY => ONE TO ONE
models.userRole.belongsTo(models.company, { 
  foreignKey: 'companyId', onDelete: 'cascade', onUpdate: 'cascade' 
});

models.company.hasOne(models.userRole);

// USER / AD => ONE TO MANY 
models.user.hasMany(models.ad, {
  foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'
});

models.ad.belongsTo(models.user);

// USER / MESSAGE => ONE TO MANY 
models.user.hasMany(models.message, {
  foreignKey: 'userId', foreignKey: 'recipient', onDelete: 'cascade', onUpdate: 'cascade'
});

models.message.belongsTo(models.user);

/**
 * RELATIONSHIP EXAMPLES
 * 
 * ONE TO ONE
 * models.role.hasOne(models['company'], { foreignKey: 'roleId' });
 * models.company.belongsTo(models['role']);
 * 
 * ONE TO MANY
 * models.user.hasMany(models.message, { foreignKey: 'userId' });
 * models.message.belongsTo(models.user);
 * 
 * MANY TO MANY: duplicated entries not allowed (an user can't have 2 equal roles)
 * models.user.belongsToMany(models.role, { 
 *   through: 'user_role',
 * });
 * 
 * models.role.belongsToMany(models.user, {
 *   through: 'user_role'
 * });
 * 
 * MANY TO MANY: duplicated entries allowed (an user can have 2 equal roles)
 * models.user.belongsToMany(models.role, { 
 *   through: { model: models.userRole, unique: false }
 * });
 * 
 * models.role.belongsToMany(models.user, { 
 *   through: { model: models.userRole, unique: false }
 * });
 */