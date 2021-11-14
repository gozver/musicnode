const User = require('../models/user');
const Role = require('../models/role');

const Message = require('../models/message');
const Ad = require('../models/user');
const Band = require('../models/user');
const Company = require('../models/user');

// if not exists, ad a userId foreign key to message db table
User.hasMany(Role);

// if not exists, ad a userId key to message db table
Role.belongsTo(User);
