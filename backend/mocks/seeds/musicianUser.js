const config = require('../../config/config.json');

// avatar and password for all the users (Abcd1234)
const avatar = `${config.server.url}/avatars/user.png`;
const password = '$2a$12$D/vDRpecICTWCv9rQIsH4.BVoMf8MlIHPQf0FZdAtKWestrGdmVGm';

const musicianUsers = [{ 
  name: 'Lolo', surname: 'Gonzalez', email: 'lolo@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/musician01.jpg`, hasRole: true, activeRole: 1
}, { 
  name: 'Marcus', surname: 'Miller', email: 'marcus@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/musician02.jpg`, hasRole: true, activeRole: 1
}, { 
  name: 'Charles', surname: 'Berthoud', email: 'charles@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/musician03.jpg`, hasRole: true, activeRole: 1 
}, { name: 'Marcelo', surname: 'Feldman', email: 'marcelo@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/musician04.jpg`, hasRole: true, activeRole: 1
}, { 
  name: 'Daric', surname: 'Bennett', email: 'daric@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/musician05.jpg`, hasRole: true, activeRole: 1 }
];

module.exports = musicianUsers;