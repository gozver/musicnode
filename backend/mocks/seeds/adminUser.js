const config = require('../../config/config.json');

// avatar and password for all the users (Abcd1234)
const avatar = `${config.serverUrl}/avatars/user.png`;
const password = '$2a$12$D/vDRpecICTWCv9rQIsH4.BVoMf8MlIHPQf0FZdAtKWestrGdmVGm';

const adminUsers = [
  { name: 'Bob', surname: 'Adams', email: 'bob@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Anthony', surname: 'Nelson', email: 'anthony@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Isaiah', surname: 'Baker', email: 'isaiah@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
];

module.exports = adminUsers;