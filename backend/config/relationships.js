const models = require('../models');

/**
 * USER/ROLE: ONE TO MANY
 */
models.user.hasMany(models.role, {
  foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'
});

models.role.belongsTo(models.user);

/**
 * USER/BAND: MANY TO MANY (DUPLICATED ENTRIES ALLOWED)
 */
models.user.belongsToMany(models.band, { 
  through: 'user_band', unique: false, onDelete: 'cascade', onUpdate: 'cascade'
});

models.band.belongsToMany(models.user, {
  through: 'user_band', unique: false, onDelete: 'cascade', onUpdate: 'cascade'
});

/**
 * USER/COMPANY: MANY TO MANY (DUPLICATED ENTRIES ALLOWED)
 */
models.user.belongsToMany(models.company, {
  through: 'user_comp', unique: false, onDelete: 'cascade', onUpdate: 'cascade'
});

models.company.belongsToMany(models.user, {
  through: 'user_comp', unique: false, onDelete: 'cascade', onUpdate: 'cascade'
});

/**
 * USER/AD: ONE TO MANY
 */
models.user.hasMany(models.ad, {
  foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'
});

models.ad.belongsTo(models.user);

/**
 * USER/MESSAGE: ONE TO MANY
 */
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