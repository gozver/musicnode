const config = require('../../config/config.json');

// avatar and password for all the users: 123123123
const avatar = `${config.serverUrl}/avatars/user.png`;
const password = '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC';

const companyUsers = [
  // Vnue
  { name: 'Eli', surname: 'Hall', email: 'eli@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: false },
  { name: 'John', surname: 'Rivera', email: 'john@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: false },
  
  // Producer Presets
  { name: 'Joseph', surname: 'Campbell', email: 'joseph@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: false },
  { name: 'Matthew', surname: 'Mitchell', email: 'matthew@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: false },
  
  // Hapinez Productions
  { name: 'William', surname: 'Carter', email: 'william@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: false },
  { name: 'Christopher', surname: 'Roberts', email: 'christopher@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: false },
];

module.exports = companyUsers;