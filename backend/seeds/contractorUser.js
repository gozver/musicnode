const config = require('../config/config.json');

// avatar and password for all the users: 123123123
const avatar = `${config.serverUrl}/avatars/user.jpg`;
const password = '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC';

const contractorUsers = [
  { name: 'Josiah', surname: 'Hill', email: 'josiah@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Elias', surname: 'Flores', email: 'elias@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Jaxon', surname: 'Green', email: 'jaxon@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
];

module.exports = contractorUsers;