const config = require('../config/config.json');

// avatar and password for all the users: 123123123
const avatar = `${config.serverUrl}/avatars/user.png`;
const password = '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC';

const adminUsers = [
  { name: 'Bob', surname: 'Adams', email: 'bob@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Anthony', surname: 'Nelson', email: 'anthony@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Isaiah', surname: 'Baker', email: 'isaiah@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
];

module.exports = adminUsers;