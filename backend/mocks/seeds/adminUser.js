const config = require('../../config/config.json');

// avatar and password for all the users (Abcd1234)
const avatar = `${config.server.url}/avatars/user.png`;
const password = '$2a$12$D/vDRpecICTWCv9rQIsH4.BVoMf8MlIHPQf0FZdAtKWestrGdmVGm';

const adminUsers = [
  {
    name: 'Bob', surname: 'Adams', email: 'bob@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/admin01.jpg`, hasRole: true, activeRole: 5
  },
  {
    name: 'Anthony', surname: 'Nelson', email: 'anthony@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/admin02.jpg`, hasRole: true, activeRole: 5
  },
  {
    name: 'Isaiah', surname: 'Baker', email: 'isaiah@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/admin03.jpg`, hasRole: true, activeRole: 5
  },
];

module.exports = adminUsers;