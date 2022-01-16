const config = require('../config/config.json');

// avatar and password for all the users (Abcd1234)
const avatar = `${config.serverUrl}/avatars/user.png`;
const password = '$2a$12$D/vDRpecICTWCv9rQIsH4.BVoMf8MlIHPQf0FZdAtKWestrGdmVGm';

const contractorUsers = [
  { name: 'Josiah', surname: 'Hill', email: 'josiah@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Elias', surname: 'Flores', email: 'elias@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Jaxon', surname: 'Green', email: 'jaxon@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
];

module.exports = contractorUsers;