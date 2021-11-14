const Ad = require('../models/ad');
const Band = require('../models/band');
const Company = require('../models/company');
const Message = require('../models/message');
const Role = require('../models/role');
const User = require('../models/user');

User.hasMany(Ad);         // 1 user has 0 or many ads
Ad.belongsTo(User);       // 1 ad belongs to 1 user

User.hasMany(Message);    // 1 user has 0 or many messages
Message.belongsTo(User);  // 1 message belongs to 1 user

User.hasMany(Role);       // 1 user has 1 or many roles
Role.belongsTo(User);     // 1 role belongs to 1 user

Role.hasOne(Band);        // 1 role has 0 or 1 band
Band.belongsTo(Role);     // 1 band belongs to 1 role

Role.hasOne(Company);     // 1 role has 0 or 1 company
Company.belongsTo(Role);  // 1 company belongs to 1 role
