const config = require('../../config/config.json');

// avatar and password for all the users (Abcd1234)
const avatar = `${config.serverUrl}/avatars/user.png`;
const password = '$2a$12$D/vDRpecICTWCv9rQIsH4.BVoMf8MlIHPQf0FZdAtKWestrGdmVGm';

const bandUsers = [
  // Aerosmith
  { name: 'Liam', surname: 'Smith', email: 'liam@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Noah', surname: 'Johnson', email: 'noah@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Oliver', surname: 'Williams', email: 'oliver@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },

  // The Beach Boys
  { name: 'Elijah', surname: 'Brown', email: 'elijah@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Lucas', surname: 'Jones', email: 'lucas@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Levi', surname: 'Garcia', email: 'levi@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  
  // The Doors
  { name: 'Mason', surname: 'Miller', email: 'mason@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'James', surname: 'Davis', email: 'james@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Ethan', surname: 'Rodriguez', email: 'ethan@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  
  // The Eagles
  { name: 'Mateo', surname: 'Martinez', email: 'mateo@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Leo', surname: 'Hernandez', email: 'leo@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Jack', surname: 'Lopez', email: 'jack@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  
  // Guns N Roses
  { name: 'Benjamin', surname: 'Wilson', email: 'benjamin@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Aiden', surname: 'Anderson', email: 'aiden@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Logan', surname: 'Thomas', email: 'logan@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  
  // Iggy Pop
  { name: 'Grayson', surname: 'Taylor', email: 'grayson@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Jackson', surname: 'Moore', email: 'jackson@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Henry', surname: 'Jackson', email: 'henry@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  
  // Kiss
  { name: 'Wyatt', surname: 'Martin', email: 'wyatt@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Sebastian', surname: 'Lee', email: 'sebastian@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Carter', surname: 'Perez', email: 'carter@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  
  // Metallica
  { name: 'Daniel', surname: 'Thompson', email: 'daniel@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Alex', surname: 'White', email: 'alex@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Ezra', surname: 'Harris', email: 'ezra@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  
  // Pearl Jam
  { name: 'Owen', surname: 'Clark', email: 'owen@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Michael', surname: 'Ramirez', email: 'michael@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Muhammad', surname: 'Lewis', email: 'muhammad@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  
  // Van Halen
  { name: 'Julian', surname: 'Robinson', email: 'julian@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Hudson', surname: 'Walker', email: 'hudson@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Luke', surname: 'Young', email: 'luke@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  
  // ZZ Top
  { name: 'Jacob', surname: 'Allen', email: 'jacob@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Lincoln', surname: 'King', email: 'lincoln@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Gabriel', surname: 'Wright', email: 'gabriel@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  
  // Sly & the Family Stone
  { name: 'Jayden', surname: 'Scott', email: 'jayden@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Luca', surname: 'Torres', email: 'luca@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
  { name: 'Maverick', surname: 'Nguyen', email: 'maverick@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true },
];

module.exports = bandUsers;