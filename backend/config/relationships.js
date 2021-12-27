const models = require('../models');

// many to many
models.user.belongsToMany(models.role, { 
  through: 'user_role' 
});

models.role.belongsToMany(models.user, {
  through: 'user_role'
});

// one to one
models.userRole.belongsTo(models.band, { 
  foreignKey: 'bandId',
  onDelete: 'cascade',
  onUpdate: 'cascade' 
});

models.band.hasOne(models.userRole);

models.userRole.belongsTo(models.company, { 
  foreignKey: 'companyId',
  onDelete: 'cascade',
  onUpdate: 'cascade' 
});

models.company.hasOne(models.userRole);

// one to many 
models.user.hasMany(models.ad, {
  foreignKey: 'userId',
  onDelete: 'cascade',
  onUpdate: 'cascade'
});

models.ad.belongsTo(models.user);

// // one to one example
// models.role.hasOne(models['company'], { foreignKey: 'roleId' });
// models.company.belongsTo(models['role']);

// // one to many example
// models.user.hasMany(models.message, { foreignKey: 'userId' });
// models.message.belongsTo(models.user);