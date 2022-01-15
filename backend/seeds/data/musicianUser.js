const config = require('../../config/config.json');

// avatar and password for all the users: 123123123
const avatar = `${config.serverUrl}/avatars/user.png`;
const password = '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC';

const musicianUsers = [
  { name: 'Lolo', surname: 'Gonzalez', email: 'lolo@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Marcus', surname: 'Miller', email: 'marcus@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Charles', surname: 'Berthoud', email: 'charles@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Marcelo', surname: 'Feldman', email: 'marcelo@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Daric', surname: 'Bennett', email: 'daric@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
];

module.exports = musicianUsers;